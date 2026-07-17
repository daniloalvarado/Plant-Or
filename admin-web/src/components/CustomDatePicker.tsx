import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, X } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, getHours, getMinutes, setHours, setMinutes } from 'date-fns';
import { es } from 'date-fns/locale';

interface CustomDatePickerProps {
  value: string;
  onChange: (val: string) => void;
  type?: 'date' | 'datetime-local';
  className?: string;
  placeholder?: string;
  maxDate?: Date;
}

export function CustomDatePicker({ value, onChange, type = 'date', className = '', placeholder = 'dd/mm/aaaa', maxDate }: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'date' | 'time' | 'minute'>('date');
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
    if (maxDate && day > maxDate) return;

    let newDate = day;
    if (value && type === 'datetime-local') {
      const existingDate = parseValue();
      newDate = setHours(newDate, getHours(existingDate));
      newDate = setMinutes(newDate, getMinutes(existingDate));
    } else if (!value && type === 'datetime-local') {
      // Default to 00:00
      newDate = setHours(newDate, 0);
      newDate = setMinutes(newDate, 0);
    }
    
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const d = String(newDate.getDate()).padStart(2, '0');
    
    if (type === 'datetime-local') {
      const h = String(newDate.getHours()).padStart(2, '0');
      const m = String(newDate.getMinutes()).padStart(2, '0');
      onChange(`${year}-${month}-${d}T${h}:${m}`);
      setView('time');
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
        const isDisabled = maxDate && day > maxDate && !isSameDay(day, maxDate);

        days.push(
          <div
            key={day.toString()}
            onClick={() => !isDisabled && handleDateClick(cloneDay)}
            className={`p-1 flex justify-center items-center text-sm w-8 h-8 mx-auto rounded-full transition-all
              ${isDisabled ? 'text-muted-foreground/20 cursor-not-allowed' : 
                !isCurrentMonth ? 'text-muted-foreground/30 hover:text-foreground cursor-pointer' : 
                isSelected ? 'bg-primary text-primary-foreground font-bold shadow-md scale-110 cursor-pointer' : 
                isToday ? 'bg-secondary text-foreground font-semibold border border-border cursor-pointer' : 
                'text-foreground hover:bg-secondary cursor-pointer'}`}
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
        onClick={() => {
          if (!isOpen) setView('date');
          setIsOpen(!isOpen);
        }}
        className={`flex items-center justify-between w-full px-4 py-3 bg-secondary/50 border rounded-xl text-sm text-foreground hover:bg-secondary focus:outline-none transition-all cursor-pointer ${isOpen ? 'border-primary ring-1 ring-primary/50' : 'border-border'}`}
      >
        <span className={displayValue ? 'text-foreground font-medium' : 'text-muted-foreground'}>
          {displayValue || placeholder}
        </span>
        <CalendarIcon className={`w-5 h-5 transition-colors flex-shrink-0 ${isOpen ? 'text-primary' : 'text-muted-foreground'}`} />
      </button>

      {isOpen && view === 'date' && (
        <div className="absolute z-50 mt-2 p-4 bg-card border border-border rounded-xl shadow-2xl w-[300px] left-0 origin-top animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="animate-in fade-in slide-in-from-left-4 duration-300">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
          </div>
        </div>
      )}

      {isOpen && (view === 'time' || view === 'minute') && (
        <div 
          className="fixed inset-0 z-[110] flex p-4 overflow-y-auto bg-background/80 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => { setIsOpen(false); setView('date'); }}
        >
          <div 
            className="m-auto bg-card border border-border rounded-3xl p-6 w-[320px] shadow-2xl flex flex-col items-center animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between mb-2">
              <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Seleccionar Hora
              </h3>
              <button 
                type="button" 
                onClick={() => { setIsOpen(false); setView('date'); }} 
                className="p-1.5 hover:bg-secondary rounded-full transition-colors text-muted-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex flex-col items-center mb-6 mt-2 relative w-full">
              <div className="flex gap-2 text-3xl font-bold text-foreground mb-6">
                <button 
                  type="button"
                  onClick={() => setView('time')}
                  className={`px-3 py-1.5 rounded-xl transition-colors ${view === 'time' ? 'bg-primary/20 text-primary scale-105' : 'text-muted-foreground hover:bg-secondary'}`}
                >
                  {format(parseValue(), 'HH')}
                </button>
                <span className="text-muted-foreground py-1.5">:</span>
                <button 
                  type="button"
                  onClick={() => setView('minute')}
                  className={`px-3 py-1.5 rounded-xl transition-colors ${view === 'minute' ? 'bg-primary/20 text-primary scale-105' : 'text-muted-foreground hover:bg-secondary'}`}
                >
                  {format(parseValue(), 'mm')}
                </button>
              </div>
              
              <div className="relative w-56 h-56 rounded-full bg-secondary/50 flex items-center justify-center shadow-inner">
                {/* Center Dot */}
                <div className="absolute w-3 h-3 rounded-full bg-primary z-10 shadow-sm" />
                
                {/* Clock Hand */}
                <div 
                  className="absolute w-1 bg-primary origin-bottom z-0 transition-all duration-300 ease-out"
                  style={{ 
                    height: '40%', 
                    bottom: '50%',
                    transform: `rotate(${view === 'time' ? getHours(parseValue()) * 30 : getMinutes(parseValue()) * 6}deg)`
                  }}
                >
                  <div className="absolute -top-3 -left-2.5 w-6 h-6 rounded-full bg-primary" />
                </div>
                
                {/* Numbers */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const num = view === 'time' ? (i === 0 ? 12 : i) : (i * 5 === 0 ? '00' : i * 5);
                  const angle = i * 30;
                  const radian = (angle - 90) * (Math.PI / 180);
                  const radius = 90;
                  const x = Math.cos(radian) * radius;
                  const y = Math.sin(radian) * radius;
                  
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        let d = parseValue();
                        if (view === 'time') {
                          const newHour = i === 0 ? 12 : i;
                          d = setHours(d, getHours(d) >= 12 ? (newHour === 12 ? 12 : newHour + 12) : (newHour === 12 ? 0 : newHour));
                          setView('minute');
                        } else {
                          d = setMinutes(d, i * 5);
                        }
                        const y_str = d.getFullYear();
                        const m_str = String(d.getMonth() + 1).padStart(2, '0');
                        const d_str = String(d.getDate()).padStart(2, '0');
                        const h_str = String(d.getHours()).padStart(2, '0');
                        const min_str = String(d.getMinutes()).padStart(2, '0');
                        onChange(`${y_str}-${m_str}-${d_str}T${h_str}:${min_str}`);
                      }}
                      className={`absolute w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold transition-all hover:bg-primary/20 hover:text-primary z-20 focus:outline-none`}
                      style={{ 
                        transform: `translate(${x}px, ${y}px)` 
                      }}
                    >
                      <span className={((view === 'time' && (i===0 ? 12 : i) === (getHours(parseValue()) % 12 || 12)) || (view === 'minute' && i*5 === getMinutes(parseValue()))) ? 'text-primary-foreground relative z-30' : ''}>{num}</span>
                    </button>
                  )
                })}
              </div>
              
              {/* AM/PM Toggle */}
              {view === 'time' && (
                <div className="flex gap-2 mt-6 bg-secondary/50 p-1.5 rounded-xl">
                  <button 
                    type="button"
                    onClick={() => {
                      let d = parseValue();
                      if (getHours(d) >= 12) d = setHours(d, getHours(d) - 12);
                      const y_str = d.getFullYear();
                      const m_str = String(d.getMonth() + 1).padStart(2, '0');
                      const d_str = String(d.getDate()).padStart(2, '0');
                      const h_str = String(d.getHours()).padStart(2, '0');
                      const min_str = String(d.getMinutes()).padStart(2, '0');
                      onChange(`${y_str}-${m_str}-${d_str}T${h_str}:${min_str}`);
                    }}
                    className={`px-4 py-1.5 text-sm font-bold rounded-lg transition-colors ${getHours(parseValue()) < 12 ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    AM
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      let d = parseValue();
                      if (getHours(d) < 12) d = setHours(d, getHours(d) + 12);
                      const y_str = d.getFullYear();
                      const m_str = String(d.getMonth() + 1).padStart(2, '0');
                      const d_str = String(d.getDate()).padStart(2, '0');
                      const h_str = String(d.getHours()).padStart(2, '0');
                      const min_str = String(d.getMinutes()).padStart(2, '0');
                      onChange(`${y_str}-${m_str}-${d_str}T${h_str}:${min_str}`);
                    }}
                    className={`px-4 py-1.5 text-sm font-bold rounded-lg transition-colors ${getHours(parseValue()) >= 12 ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    PM
                  </button>
                </div>
              )}
            </div>
            
            <button
              type="button"
              onClick={() => { setIsOpen(false); setView('date'); }}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 text-base"
            >
              <Clock className="w-5 h-5" />
              Confirmar Hora
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
