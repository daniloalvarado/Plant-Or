import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, getHours, getMinutes, setHours, setMinutes } from 'date-fns';
import { es } from 'date-fns/locale';

interface CustomDatePickerProps {
  value: string;
  onChange: (val: string) => void;
  type?: 'date' | 'datetime-local';
  className?: string;
  placeholder?: string;
}

export function CustomDatePicker({ value, onChange, type = 'date', className = '', placeholder = 'dd/mm/aaaa' }: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const parseValue = () => {
    if (!value) return new Date();
    if (value.length === 10) return new Date(value + 'T00:00:00'); // Date only
    return new Date(value); // Datetime
  };
  
  const [currentMonth, setCurrentMonth] = useState(parseValue());

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (value) {
      setCurrentMonth(parseValue());
    }
  }, [value]);

  const handleDateClick = (day: Date) => {
    let newDate = day;
    if (value && type === 'datetime-local') {
      const existingDate = parseValue();
      newDate = setHours(newDate, getHours(existingDate));
      newDate = setMinutes(newDate, getMinutes(existingDate));
    } else if (!value && type === 'datetime-local') {
      // Default to current time if no time set yet
      newDate = setHours(newDate, new Date().getHours());
      newDate = setMinutes(newDate, new Date().getMinutes());
    }
    
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const d = String(newDate.getDate()).padStart(2, '0');
    
    if (type === 'datetime-local') {
      const h = String(newDate.getHours()).padStart(2, '0');
      const m = String(newDate.getMinutes()).padStart(2, '0');
      onChange(`${year}-${month}-${d}T${h}:${m}`);
    } else {
      onChange(`${year}-${month}-${d}`);
      setIsOpen(false); 
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timeStr = e.target.value;
    if (!timeStr) return;
    const [hours, minutes] = timeStr.split(':').map(Number);
    let newDate = parseValue();
    newDate = setHours(newDate, hours);
    newDate = setMinutes(newDate, minutes);
    
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const d = String(newDate.getDate()).padStart(2, '0');
    const h = String(newDate.getHours()).padStart(2, '0');
    const m = String(newDate.getMinutes()).padStart(2, '0');
    
    onChange(`${year}-${month}-${d}T${h}:${m}`);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <button type="button" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-1 hover:bg-secondary rounded-full transition-colors cursor-pointer">
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <span className="text-sm font-bold text-foreground capitalize">
          {format(currentMonth, 'MMMM yyyy', { locale: es })}
        </span>
        <button type="button" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-1 hover:bg-secondary rounded-full transition-colors cursor-pointer">
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center text-[10px] font-bold text-muted-foreground uppercase py-1">
          {format(addDays(startDate, i), 'E', { locale: es }).substring(0, 2)}
        </div>
      );
    }
    return <div className="grid grid-cols-7 mb-2">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';
    const selectedDate = value ? parseValue() : null;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;
        
        const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isToday = isSameDay(day, new Date());

        days.push(
          <div
            key={day.toString()}
            onClick={() => handleDateClick(cloneDay)}
            className={`p-1 flex justify-center items-center cursor-pointer text-sm w-8 h-8 mx-auto rounded-full transition-all
              ${!isCurrentMonth ? 'text-muted-foreground/30 hover:text-foreground' : 
                isSelected ? 'bg-primary text-primary-foreground font-bold shadow-md scale-110' : 
                isToday ? 'bg-secondary text-foreground font-semibold border border-border' : 
                'text-foreground hover:bg-secondary'}`}
          >
            <span>{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-y-1 mb-1" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  const displayValue = value ? (type === 'datetime-local' ? format(parseValue(), 'dd/MM/yyyy HH:mm') : format(parseValue(), 'dd/MM/yyyy')) : '';

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full px-4 py-3 bg-secondary/50 border rounded-xl text-sm text-foreground hover:bg-secondary focus:outline-none transition-all cursor-pointer ${isOpen ? 'border-primary ring-1 ring-primary/50' : 'border-border'}`}
      >
        <span className={displayValue ? 'text-foreground font-medium' : 'text-muted-foreground'}>
          {displayValue || placeholder}
        </span>
        <CalendarIcon className={`w-5 h-5 transition-colors flex-shrink-0 ${isOpen ? 'text-primary' : 'text-muted-foreground'}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 p-4 bg-card border border-border rounded-xl shadow-2xl w-[280px] left-0 origin-top animate-in fade-in slide-in-from-top-2 duration-200">
          {renderHeader()}
          {renderDays()}
          {renderCells()}
          
          {type === 'datetime-local' && (
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-2 text-foreground text-sm font-medium">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>Hora:</span>
              </div>
              <input
                type="time"
                value={value ? format(parseValue(), 'HH:mm') : '00:00'}
                onChange={handleTimeChange}
                className="bg-secondary/50 border border-border rounded-lg px-2 py-1.5 text-sm font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary dark:[color-scheme:dark] cursor-pointer"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
