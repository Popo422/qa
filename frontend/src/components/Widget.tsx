import { ReactNode } from 'react';

interface WidgetProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function Widget({ title, children, className = "" }: WidgetProps) {
  return (
    <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
      {title && (
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}