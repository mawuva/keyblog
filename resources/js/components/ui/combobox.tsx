"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export interface ComboboxOption<T = string | number> {
  value: T
  label: string
}

interface ComboboxProps<T = string | number> {
  options: ComboboxOption<T>[]
  value?: T
  onValueChange?: (value: T | undefined) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  className?: string
  disabled?: boolean
  renderItem?: (option: ComboboxOption<T>, isSelected: boolean) => React.ReactNode
}

export function Combobox<T extends string | number = string | number>({
  options,
  value,
  onValueChange,
  placeholder = "Sélectionner...",
  searchPlaceholder = "Rechercher...",
  emptyText = "Aucun résultat trouvé.",
  className,
  disabled = false,
  renderItem,
}: ComboboxProps<T>) {
  const [open, setOpen] = React.useState(false)

  const selectedOption = React.useMemo(
    () => options.find((option) => option.value === value),
    [options, value]
  )

  const handleSelect = (currentValue: string) => {
    const option = options.find((opt) => String(opt.value) === currentValue)
    if (option) {
      const newValue = value === option.value ? undefined : option.value
      onValueChange?.(newValue)
      setOpen(false)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn("w-full justify-between", className)}
        >
          {selectedOption?.label || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} className="h-9" />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = value === option.value
                const optionValue = String(option.value)

                if (renderItem) {
                  return (
                    <CommandItem
                      key={optionValue}
                      value={optionValue}
                      onSelect={handleSelect}
                    >
                      {renderItem(option, isSelected)}
                    </CommandItem>
                  )
                }

                return (
                  <CommandItem
                    key={optionValue}
                    value={optionValue}
                    onSelect={handleSelect}
                  >
                    {option.label}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        isSelected ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
