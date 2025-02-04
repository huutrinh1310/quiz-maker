import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type AnswerButtonProps = {
  value: string;
  onClick?: () => void;
  isCorrect?: boolean;
  isSelected?: boolean;
} & React.ComponentProps<typeof Button>;

export function AnswerButton({
  variant = "outline",
  onClick,
  isCorrect,
  isSelected,
  ...props
}: AnswerButtonProps) {
  const { children, className, ...rest } = props;

  return (
    <Button
      onClick={onClick}
      variant={variant}
      className={cn(
        "w-fit  !border-green-500 !text-green-500",
        className,
        variant === "default" && "!bg-green-500 !text-white",
        isSelected && isCorrect && "!bg-green-500 !text-white",
        isSelected && !isCorrect && "!bg-red-500 !text-white"
      )}
      dangerouslySetInnerHTML={{ __html: children as string }}
      {...rest}
    />
  );
}
