import React, { useState } from 'react';
import { Calendar, Edit3, Trash2, CheckCircle2, Circle } from 'lucide-react';

const TodoCard = ({ todo, onToggleStatus, onEdit, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-brand-danger/10 text-brand-danger border-brand-danger/20';
      case 'Medium':
        return 'bg-brand-warning/10 text-brand-warning border-brand-warning/20';
      case 'Low':
      default:
        return 'bg-brand-primary/10 text-brand-primary border-brand-primary/20';
    }
  };

  const isOverdue = todo.due_date && !todo.status && new Date(todo.due_date) < new Date();

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className={`p-5 rounded-2xl bg-dark-card border transition-all duration-200 ${
      todo.status ? 'border-dark-border/50 opacity-75' : isOverdue ? 'border-brand-danger/40' : 'border-dark-border hover:border-dark-border/80'
    } shadow-md`}>
      <div className="flex items-start justify-between gap-3">
        {/* Left Side: Checkbox & Todo Info */}
        <div className="flex items-start space-x-3 flex-1 min-w-0">
          <button
            onClick={() => onToggleStatus(todo.id, !todo.status)}
            className={`mt-0.5 flex-shrink-0 transition duration-200 rounded-full ${
              todo.status ? 'text-brand-secondary' : 'text-dark-muted hover:text-brand-primary'
            }`}
          >
            {todo.status ? (
              <CheckCircle2 className="w-6 h-6 fill-brand-secondary/10" />
            ) : (
              <Circle className="w-6 h-6" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <h3 className={`text-base font-semibold leading-6 text-dark-text truncate ${
              todo.status ? 'line-through text-dark-muted' : ''
            }`}>
              {todo.title}
            </h3>
            {todo.description && (
              <p className={`mt-1 text-sm text-dark-muted line-clamp-2 ${
                todo.status ? 'line-through' : ''
              }`}>
                {todo.description}
              </p>
            )}
          </div>
        </div>

        {/* Right Side: Priority Tag */}
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getPriorityStyles(todo.priority)}`}>
          {todo.priority}
        </span>
      </div>

      {/* Footer Details & Actions */}
      <div className="mt-5 flex items-center justify-between border-t border-dark-border/50 pt-3 text-xs">
        {/* Due Date Indicator */}
        <div className={`flex items-center space-x-1.5 ${
          todo.status ? 'text-dark-muted' : isOverdue ? 'text-brand-danger font-medium' : 'text-dark-muted'
        }`}>
          {todo.due_date && (
            <>
              <Calendar className="w-4 h-4" />
              <span>
                {formatDate(todo.due_date)} {isOverdue && "(Overdue)"}
              </span>
            </>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          {showConfirm ? (
            <div className="flex items-center space-x-1 bg-dark-bg border border-brand-danger/30 rounded-lg p-1 animate-fadeIn">
              <span className="text-[10px] text-brand-danger font-bold px-1.5">Delete?</span>
              <button
                onClick={() => {
                  onDelete(todo.id);
                  setShowConfirm(false);
                }}
                className="px-2 py-0.5 bg-brand-danger text-white rounded text-[10px] font-bold hover:bg-brand-danger-dark transition"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-2 py-0.5 bg-dark-border text-dark-text rounded text-[10px] hover:bg-dark-border/80 transition"
              >
                No
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => onEdit(todo)}
                className="p-1.5 text-dark-muted hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition"
                title="Edit Task"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowConfirm(true)}
                className="p-1.5 text-dark-muted hover:text-brand-danger hover:bg-brand-danger/10 rounded-lg transition"
                title="Delete Task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
