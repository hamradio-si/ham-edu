'use client';

import { useState } from 'react';

interface StartFormProps {
  onStart: (questions: number, time: number) => void;
}

export function StartForm({ onStart }: StartFormProps) {
  const [time, setTime] = useState(90);
  const [questions, setQuestions] = useState(60);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="form-control flex-1">
          <label className="label">
            <span className="label-text">Število vprašanj</span>
          </label>
          <input
            type="number"
            className="input input-bordered w-full"
            value={questions}
            onChange={(e) => setQuestions(parseInt(e.target.value))}
          />
        </div>
        <div className="form-control flex-1">
          <label className="label">
            <span className="label-text">Čas</span>
          </label>
          <div className="relative">
            <input
              type="number"
              className="input input-bordered w-full pr-12"
              value={time}
              onChange={(e) => setTime(parseInt(e.target.value))}
            />
            <span className="pointer-events-none absolute bottom-3 right-4">
              min
            </span>
          </div>
        </div>
      </div>

      <button
        className="btn btn-primary"
        onClick={() => onStart(questions, time)}
      >
        Začni
      </button>
    </div>
  );
}
