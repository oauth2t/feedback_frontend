'use client';

type StatusMessageProps = {
  type: 'success' | 'error';
  message: string;
};

export default function StatusMessage({ type, message }: StatusMessageProps) {
  return (
    <div className={`${type}-message`}>
      {message}
    </div>
  );
} 