'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createSelectFieldSchema, createTextFieldSchema } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface TextFieldValidation {
  required?: string | boolean;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
}

export interface TextField {
  label: string;
  key: string;
  placeholder: string;
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'tel'
    | 'url'
    | 'search'
    | 'color'
    | 'date'
    | 'time'
    | 'datetime-local'
    | 'month'
    | 'week';
  required: boolean;
  validation: TextFieldValidation;
}

export interface SelectField {
  label: string;
  key: string;
  options: { label: string; value: string }[];
  required: boolean;
}

interface EntityCreateEditPageProps<EntityType> {
  title: string;
  textFields: TextField[];
  selectFields: SelectField[];
  onSubmit: (data: EntityType) => Promise<void>;
  isLoading: boolean;
  fetchData?: () => Promise<EntityType>;
}

export default function EntityCreateEditPage<EntityType>({
  title,
  textFields,
  selectFields,
  onSubmit,
  isLoading,
  fetchData,
}: EntityCreateEditPageProps<EntityType>) {
  const buildValidationSchema = () => {
    const schemaMap: Record<string, z.ZodSchema> = {};

    textFields.forEach((field) => {
      schemaMap[field.key] = createTextFieldSchema({
        required: field.required || field.validation?.required,
        minLength: field.validation?.minLength,
        maxLength: field.validation?.maxLength,
        pattern: field.validation?.pattern,
        type: field.type,
      });
    });

    selectFields.forEach((field) => {
      schemaMap[field.key] = createSelectFieldSchema({
        required: field.required,
      });
    });

    return z.object(schemaMap);
  };

  const formSchema = buildValidationSchema();

  const buildDefaultValues = async () => {
    if (fetchData) {
      try {
        return await fetchData();
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }

    return Object.fromEntries([
      ...textFields.map((field) => [field.key, '']),
      ...selectFields.map((field) => [field.key, '']),
    ]);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: buildDefaultValues,
  });

  const handleFormSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await onSubmit(data as unknown as EntityType);
    } catch (error) {
      toast.error('Something went wrong');
      console.error(error);
    }
  };

  return (
    <Card className="bg-background border-none shadow-none">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          Fill in the details to update this entity
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-6"
        >
          <CardContent className="space-y-6">
            {textFields.map((field, index) => (
              <FormField
                key={`text-${index}`}
                control={form.control}
                name={field.key}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>
                      <span>
                        {field.label}
                        {field.required && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </span>
                    </FormLabel>
                    <FormControl defaultValue="">
                      <Input
                        type={field.type}
                        placeholder={field.placeholder}
                        {...formField}
                        disabled={isLoading}
                        onChange={(e) => {
                          formField.onChange(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            {selectFields.map((field, index) => (
              <FormField
                key={`select-${index}`}
                control={form.control}
                name={field.key}
                render={({ field: formField }) => {
                  return (
                    <FormItem>
                      <FormLabel>
                        <span>
                          {field.label}
                          {field.required && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                        </span>
                      </FormLabel>
                      <Select
                        value={formField.value}
                        onValueChange={(value) => {
                          formField.onChange(value);
                        }}
                        disabled={isLoading}
                      >
                        <FormControl defaultValue={''}>
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder={`Select ${field.label.toLowerCase()}`}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {field.options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            ))}
          </CardContent>
          <CardFooter>
            <Button type="submit">Submit</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
