import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import moment from 'moment';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';

enum TourPublishStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

const schema = z
  .object({
    title: z.string().min(3).max(30),
    price: z.string().min(3).max(30),
    startDate: z.date(),
    endDate: z.date(),
    content: z.string().min(3).max(500),
    postStatus: z.nativeEnum(TourPublishStatus),
    duration: z.string().min(3).max(30),
    audioGuide: z.boolean().default(false).optional(),
    foodAndDrinks: z.boolean().default(false).optional(),
    lunch: z.boolean().default(false).optional(),
    privateTour: z.boolean().default(false).optional(),
    specialActivities: z.boolean().default(false).optional(),
    entranceFees: z.boolean().default(false).optional(),
    gratuities: z.boolean().default(false).optional(),
    pickUpAndDropOff: z.boolean().default(false).optional(),
    professionalGuide: z.boolean().default(false).optional(),
    transportByAirConditioned: z.boolean().default(false).optional(),
    images: z
      .custom<FileList>((val) => val instanceof FileList, 'Required')
      .refine((files) => files.length > 0, `Required`)
      .refine((files) => files.length <= 5, `Maximum of 5 images are allowed.`)
      .refine(
        (files) =>
          Array.from(files).every((file) => file.size <= MAX_IMAGE_SIZE),
        `Each file size should be less than 5 MB.`
      )
      .refine(
        (files) =>
          Array.from(files).every((file) =>
            ALLOWED_IMAGE_TYPES.includes(file.type)
          ),
        'Only these types are allowed .jpg, .jpeg, .png and .webp'
      ),
  })
  .refine((data) => data.startDate < data.endDate, {
    message: 'Start Date must be before End Date',
    path: ['startDate', 'endDate'],
  });

type FormValues = z.infer<typeof schema>;

const MAX_IMAGE_SIZE = 5242880; // 5 MB
const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/jpg',
];

const CreateTour = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      audioGuide: false,
      foodAndDrinks: false,
      lunch: false,
      privateTour: false,
      specialActivities: false,
      entranceFees: false,
      gratuities: false,
      pickUpAndDropOff: false,
      professionalGuide: false,
      transportByAirConditioned: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div className="flex  gap-3 w-full bg-none">
      <div className="w-[25%] h-screen "></div>
      <Card className="w-[70%]">
        <CardHeader>
          <CardTitle>Create Tour</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3 flex flex-col justify-between w-full"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Example Title"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex gap-3">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Example Price"
                          className="w-[200px]"
                          min={1}
                          max={1000000000}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="mb-2">Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-[240px] pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? (
                                moment(field.value).format('DD/MM/YYYY')
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            // @ts-ignore
                            disabled={(date) =>
                              moment(date).isBefore(moment(), 'day')
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="mb-2">End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-[240px] pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? (
                                moment(field.value).format('DD/MM/YYYY')
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            className="md:w-[50%]"
                            // @ts-ignore
                            disabled={(date) =>
                              moment(date).isBefore(moment(), 'day')
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: 2-Days 3-Nights" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Program  Day 1 Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex gap-3">
                <FormField
                  control={form.control}
                  name="postStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-[200px] pl-3 text-left font-normal">
                              <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="DRAFT">Draft</SelectItem>
                            <SelectItem value="PUBLISHED">Published</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 border  shadow-sm">
                <FormField
                  control={form.control}
                  name="audioGuide"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md  p-4">
                      {/* <FormLabel>Audio Guide</FormLabel> */}
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="rounded-[3px]"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Audio Guide</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="foodAndDrinks"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md  p-4">
                      {/* <FormLabel>Audio Guide</FormLabel> */}
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="rounded-[3px]"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Food and Drinks</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lunch"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md  p-4">
                      {/* <FormLabel>Audio Guide</FormLabel> */}
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="rounded-[3px]"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Lunch</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="privateTour"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md  p-4">
                      {/* <FormLabel>Audio Guide</FormLabel> */}
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="rounded-[3px]"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Private Tour</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="specialActivities"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md  p-4">
                      {/* <FormLabel>Audio Guide</FormLabel> */}
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="rounded-[3px]"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Special Activities</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="entranceFees"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md  p-4">
                      {/* <FormLabel>Audio Guide</FormLabel> */}
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="rounded-[3px]"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Entrance Fees</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gratuities"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md  p-4">
                      {/* <FormLabel>Audio Guide</FormLabel> */}
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="rounded-[3px]"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Gratuities</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pickUpAndDropOff"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md  p-4">
                      {/* <FormLabel>Audio Guide</FormLabel> */}
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="rounded-[3px]"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Pick-up and Drop-off</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="professionalGuide"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md  p-4">
                      {/* <FormLabel>Audio Guide</FormLabel> */}
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="rounded-[3px]"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Professional Guide</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="transportByAirConditioned"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md  p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="rounded-[3px]"
                        />
                      </FormControl>

                      <div className="space-y-1 leading-none">
                        <FormLabel>Transport by Air-conditioned</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field: { onChange }, ...field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Images</FormLabel>
                        {/* File Upload */}
                        <FormControl>
                          <Input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => {
                              onChange(e.target.files);
                            }}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit">Create Tour</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTour;
