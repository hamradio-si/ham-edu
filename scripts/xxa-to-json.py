import sys
import json
import re

if len(sys.argv) != 3:
    print("Usage: python xxa-to-json.py <input_file> <output_file>")
    sys.exit(1)

# Read file
with open(sys.argv[1], "r", encoding="utf-8") as f:
    file = re.split(r"[\n\r]", f.read())

questions = []
sections = []

sectionId = 0

for line in file:
    # Skip comments and empty lines
    if line.startswith("%I"):
        continue
    elif line.strip() == "":
        question = None
        continue

    # New section
    if line.startswith("%S"):
        if line.startswith("%SS"):
            sectionId += 1
        else:
            sectionId = (sectionId // 100 + 1) * 100
        title = re.sub(r"^%SS?", "", line).strip()
        title = title[0].upper() + title[1:]
        sections.append({"id": sectionId, "title": title})
        continue

    # New question
    if line.startswith("%H"):
        correct, classes, diff, img = re.match(
            r"^%H +[\w\-]+ +([ABCD]) +\w+ +(\w+) +(\d+) +\w+(?: +([\w\.]+)(?: +[\w\.]+){2})?",
            line,
        ).groups()
        question = {
            "id": len(questions) + 1,
            "image": img.replace(".eps", ".svg") if img else None,
            "question": None,
            "answers": [],
            "correct": ord(correct) - ord("A"),
            "category": sectionId,
            "classes": [*filter(str.isupper, classes)],
            "difficulty": int(diff),
        }
        questions.append(question)
        continue

    # Unexpected line
    if question is None:
        print("Error on line:", line)
        continue

    line = (
        re.sub(r"[`'”»«]+", '"', line)
        .replace("~", " ")
        .replace("\%", "%")
        .replace("\ldots", "...")
    )
    temp = re.sub(r"\$+[^\$]+\$+", "", line)
    if g := re.search(r"[^A-ZŽŠČ\d\s%\.\-–\"():!?,/;=]", temp, re.I):
        print(f"Warning: Unusual character {g.group()} in line:", temp)

    if question["question"] is None:
        question["question"] = line
    else:
        question["answers"].append(line.rstrip(". "))


# Analysis
correctByLetter = [0, 0, 0, 0]
longestCorrect = 0

for q in questions:
    correctI = q["correct"]
    correctByLetter[correctI] += 1
    maxLen = max(map(len, q["answers"]))
    if [i for i, a in enumerate(q["answers"]) if len(a) == maxLen] == [correctI]:
        longestCorrect += 1

print("Questions:", len(questions))
print("Correct by letter:", correctByLetter)
print(
    "Longest correct count:", longestCorrect, f"({longestCorrect/len(questions):.1%})"
)

# Write to file
with open(sys.argv[2], "w", encoding="utf-8") as f:
    data = {"categories": sections, "questions": questions}
    json.dump(data, f, indent=2, ensure_ascii=False)
