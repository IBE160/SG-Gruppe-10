'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { MaterialIcon } from '@/components/ui/MaterialIcon';
import { cn } from '@/lib/utils';

export interface IconInputProps extends Omit<React.ComponentProps<'input'>, 'onChange'> {
  icon: string;
  error?: string;
  showPasswordToggle?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const IconInput = React.forwardRef<HTMLInputElement, IconInputProps>(
  ({ icon, error, showPasswordToggle, type, className, value, onChange, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    
    const inputType = showPasswordToggle && showPassword ? 'text' : type;

    return (
      <div className="relative w-full">
        <div className="relative">
          <MaterialIcon 
            icon={icon} 
            className={cn(
              'absolute left-3 top-1/2 -translate-y-1/2 text-xl pointer-events-none transition-colors',
              isFocused ? 'text-primary-green' : 'text-muted-foreground'
            )}
          />
          <Input
            ref={ref}
            type={inputType}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              'pl-10 h-12',
              showPasswordToggle && 'pr-10',
              error && 'border-red-500 focus-visible:ring-red-500',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${props.name}-error` : undefined}
            {...props}
          />
          {showPasswordToggle && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-graphite-700 transition-colors"
              aria-label="Toggle password visibility"
              tabIndex={-1}
            >
              <MaterialIcon 
                icon={showPassword ? 'visibility_off' : 'visibility'} 
                className="text-xl"
              />
            </button>
          )}
        </div>
        {error && (
          <p 
            id={`${props.name}-error`}
            className="text-sm text-red-500 mt-1 flex items-center gap-1"
          >
            <MaterialIcon icon="error" className="text-base" />
            {error}
          </p>
        )}
      </div>
    );
  }
);

IconInput.displayName = 'IconInput';
