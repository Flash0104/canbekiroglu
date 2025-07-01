"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/language-context";
import { Calendar, CheckCircle, Clock, Euro, Mail, MapPin, XCircle } from "lucide-react";
import { useMemo, useState } from "react";

// Mock availability data - in real app this would come from your CRM
const mockAvailability: Record<string, string[]> = {
  // June 2025
  "2025-06-02": ["10:00", "10:30", "11:30", "14:00", "14:30", "15:00"],
  "2025-06-03": ["10:00", "11:00", "13:00", "13:30", "15:30"],
  "2025-06-05": ["10:00", "10:30", "11:00", "11:30", "12:00", "14:00", "14:30", "15:00", "15:30"],
  "2025-06-06": ["10:30", "11:00", "12:00", "13:00", "14:00", "15:00"],
  "2025-06-09": ["10:00", "10:30", "11:00", "11:30", "12:00", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30"],
  "2025-06-10": ["11:00", "11:30", "14:00", "14:30", "15:00", "15:30"],
  "2025-06-12": ["10:00", "10:30", "11:00", "12:00", "13:00", "13:30", "14:00", "15:30"],
  "2025-06-13": ["10:00", "11:00", "11:30", "12:00", "14:00", "14:30", "15:00"],
  "2025-06-16": ["10:30", "11:00", "11:30", "13:00", "13:30", "14:00", "15:00", "15:30"],
  "2025-06-17": ["10:00", "10:30", "11:00", "14:00", "14:30", "15:00"],
  "2025-06-19": ["10:00", "11:00", "13:00", "13:30", "15:30"],
  "2025-06-20": ["10:30", "11:00", "12:00", "13:00", "14:00", "15:00"],
  "2025-06-23": ["10:00", "10:30", "11:00", "11:30", "12:00", "14:00", "14:30", "15:00", "15:30"],
  "2025-06-24": ["11:00", "11:30", "14:00", "14:30", "15:00", "15:30"],
  "2025-06-26": ["10:00", "10:30", "11:00", "12:00", "13:00", "13:30", "14:00", "15:30"],
  "2025-06-27": ["10:00", "11:00", "11:30", "12:00", "14:00", "14:30", "15:00"],
  "2025-06-30": ["10:30", "11:00", "11:30", "13:00", "13:30", "14:00", "15:00", "15:30"],
  
  // July 2025
  "2025-07-01": ["10:00", "10:30", "11:30", "14:00", "14:30", "15:00"],
  "2025-07-03": ["10:00", "11:00", "13:00", "13:30", "15:30"],
  "2025-07-04": ["10:30", "11:00", "12:00", "13:00", "14:00", "15:00"],
  "2025-07-07": ["10:00", "10:30", "11:00", "11:30", "12:00", "14:00", "14:30", "15:00", "15:30"],
  "2025-07-08": ["11:00", "11:30", "14:00", "14:30", "15:00", "15:30"],
  "2025-07-10": ["10:00", "10:30", "11:00", "12:00", "13:00", "13:30", "14:00", "15:30"],
  "2025-07-11": ["10:00", "11:00", "11:30", "12:00", "14:00", "14:30", "15:00"],
  "2025-07-14": ["10:30", "11:00", "11:30", "13:00", "13:30", "14:00", "15:00", "15:30"],
  "2025-07-15": ["10:00", "10:30", "11:30", "14:00", "14:30", "15:00"],
  "2025-07-17": ["10:00", "11:00", "13:00", "13:30", "15:30"],
  "2025-07-18": ["10:30", "11:00", "12:00", "13:00", "14:00", "15:00"],
  "2025-07-21": ["10:00", "10:30", "11:00", "11:30", "12:00", "14:00", "14:30", "15:00", "15:30"],
  "2025-07-22": ["11:00", "11:30", "14:00", "14:30", "15:00", "15:30"],
  "2025-07-24": ["10:00", "10:30", "11:00", "12:00", "13:00", "13:30", "14:00", "15:30"],
  "2025-07-25": ["10:00", "11:00", "11:30", "12:00", "14:00", "14:30", "15:00"],
  "2025-07-28": ["10:30", "11:00", "11:30", "13:00", "13:30", "14:00", "15:00", "15:30"],
  "2025-07-29": ["10:00", "10:30", "11:30", "14:00", "14:30", "15:00"],
  "2025-07-31": ["10:00", "11:00", "13:00", "13:30", "15:30"],
  
  // August 2025
  "2025-08-01": ["10:30", "11:00", "12:00", "13:00", "14:00", "15:00"],
  "2025-08-04": ["10:00", "10:30", "11:00", "11:30", "12:00", "14:00", "14:30", "15:00", "15:30"],
  "2025-08-05": ["11:00", "11:30", "14:00", "14:30", "15:00", "15:30"],
  "2025-08-07": ["10:00", "10:30", "11:00", "12:00", "13:00", "13:30", "14:00", "15:30"],
  "2025-08-08": ["10:00", "11:00", "11:30", "12:00", "14:00", "14:30", "15:00"],
  "2025-08-11": ["10:30", "11:00", "11:30", "13:00", "13:30", "14:00", "15:00", "15:30"],
  "2025-08-12": ["10:00", "10:30", "11:30", "14:00", "14:30", "15:00"],
  "2025-08-14": ["10:00", "11:00", "13:00", "13:30", "15:30"],
  "2025-08-15": ["10:30", "11:00", "12:00", "13:00", "14:00", "15:00"],
  "2025-08-18": ["10:00", "10:30", "11:00", "11:30", "12:00", "14:00", "14:30", "15:00", "15:30"],
  "2025-08-19": ["11:00", "11:30", "14:00", "14:30", "15:00", "15:30"],
  "2025-08-21": ["10:00", "10:30", "11:00", "12:00", "13:00", "13:30", "14:00", "15:30"],
  "2025-08-22": ["10:00", "11:00", "11:30", "12:00", "14:00", "14:30", "15:00"],
  "2025-08-25": ["10:30", "11:00", "11:30", "13:00", "13:30", "14:00", "15:00", "15:30"],
  "2025-08-26": ["10:00", "10:30", "11:30", "14:00", "14:30", "15:00"],
  "2025-08-28": ["10:00", "11:00", "13:00", "13:30", "15:30"],
  "2025-08-29": ["10:30", "11:00", "12:00", "13:00", "14:00", "15:00"],
};

const timeSlots = [
  "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30"
];

const servicePricing = {
  "software-development": 150,
  "international-study": 100,
  "business-helper": 120
};

export default function AppointmentPage() {
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [step, setStep] = useState<'datetime' | 'details' | 'payment'>('datetime');
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 5)); // June 2025 (month is 0-indexed)

  // Generate calendar for selected month
  const calendarDates = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Get first day of month and calculate starting calendar date
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay()); // Start from Sunday
    
    const dates = [];
    const currentDate = new Date(startDate);
    
    // Generate 42 days (6 weeks) for calendar grid
    for (let i = 0; i < 42; i++) {
      const dateString = currentDate.toISOString().split('T')[0];
      const isCurrentMonth = currentDate.getMonth() === month;
      const isToday = dateString === new Date().toISOString().split('T')[0];
      const isPastDate = currentDate < new Date(new Date().setHours(0, 0, 0, 0));
      
      dates.push({
        date: dateString,
        dayNumber: currentDate.getDate(),
        isCurrentMonth,
        isToday,
        isPastDate,
        isWeekend: currentDate.getDay() === 0 || currentDate.getDay() === 6,
        availableSlots: mockAvailability[dateString] || []
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return dates;
  }, [currentMonth]);

  // Available months (current + next 2 months)
  const availableMonths = useMemo(() => {
    const months = [];
    const baseDate = new Date(2025, 5); // Start from June 2025
    
    for (let i = 0; i < 3; i++) {
      const monthDate = new Date(baseDate.getFullYear(), baseDate.getMonth() + i, 1);
      months.push({
        value: monthDate,
        label: monthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      });
    }
    
    return months;
  }, []);

  const selectedDateSlots = selectedDate ? mockAvailability[selectedDate] || [] : [];
  const selectedPrice = selectedService ? servicePricing[selectedService as keyof typeof servicePricing] : 0;

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime("");
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleServiceSelect = (service: string) => {
    setSelectedService(service);
  };

  const handleNextStep = () => {
    if (step === 'datetime' && selectedDate && selectedTime) {
      setStep('details');
    } else if (step === 'details' && selectedService) {
      setStep('payment');
    }
  };

  const handlePreviousStep = () => {
    if (step === 'details') {
      setStep('datetime');
    } else if (step === 'payment') {
      setStep('details');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      date: selectedDate,
      time: selectedTime,
      service: selectedService,
      message: formData.get('message'),
      price: selectedPrice,
    };

    try {
      const response = await fetch('/api/appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Here you would integrate with payment processor
        // For now, we'll simulate payment success
        setTimeout(() => {
          setStep('datetime');
          setSelectedDate("");
          setSelectedTime("");
          setSelectedService("");
        }, 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t("appointment.title")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("appointment.description")}
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${step === 'datetime' ? 'text-blue-600' : step === 'details' || step === 'payment' ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'datetime' ? 'bg-blue-600 text-white' : step === 'details' || step === 'payment' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="font-medium">Date & Time</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-300"></div>
            <div className={`flex items-center space-x-2 ${step === 'details' ? 'text-blue-600' : step === 'payment' ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'details' ? 'bg-blue-600 text-white' : step === 'payment' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="font-medium">Service Details</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-300"></div>
            <div className={`flex items-center space-x-2 ${step === 'payment' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'payment' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                3
              </div>
              <span className="font-medium">Payment & Booking</span>
            </div>
          </div>
        </div>

        {/* Step 1: Date & Time Selection */}
        {step === 'datetime' && (
          <div className="grid lg:grid-cols-2 gap-8">
                         {/* Calendar */}
             <Card>
               <CardHeader>
                 <CardTitle className="flex items-center gap-2">
                   <Calendar className="h-5 w-5 text-blue-600" />
                   Select Date
                 </CardTitle>
                 <CardDescription>
                   Choose your preferred date from available slots
                 </CardDescription>
               </CardHeader>
               <CardContent>
                 {/* Month Selector */}
                 <div className="mb-4">
                   <Label htmlFor="month-select" className="text-sm font-medium">Select Month</Label>
                   <select
                     id="month-select"
                     value={currentMonth.getTime()}
                     onChange={(e) => setCurrentMonth(new Date(parseInt(e.target.value)))}
                     className="w-full mt-1 flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                   >
                     {availableMonths.map((month) => (
                       <option key={month.value.getTime()} value={month.value.getTime()}>
                         {month.label}
                       </option>
                     ))}
                   </select>
                 </div>

                 {/* Calendar Grid */}
                 <div className="grid grid-cols-7 gap-1 mb-4">
                   {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                     <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                       {day}
                     </div>
                   ))}
                 </div>
                 <div className="grid grid-cols-7 gap-1">
                   {calendarDates.map((dateInfo, index) => {
                     const hasAvailableSlots = dateInfo.availableSlots.length > 0;
                     const isClickable = dateInfo.isCurrentMonth && !dateInfo.isPastDate && hasAvailableSlots;
                     
                     return (
                       <button
                         key={`${dateInfo.date}-${index}`}
                         onClick={() => isClickable && handleDateSelect(dateInfo.date)}
                         disabled={!isClickable}
                         className={`p-2 text-sm rounded-lg transition-all relative ${
                           selectedDate === dateInfo.date
                             ? 'bg-blue-600 text-white'
                             : isClickable
                             ? 'hover:bg-blue-50 hover:text-blue-600 border-2 border-transparent hover:border-blue-200'
                             : dateInfo.isCurrentMonth
                             ? 'text-gray-400 cursor-not-allowed'
                             : 'text-gray-200 cursor-not-allowed'
                         } ${
                           dateInfo.isToday && dateInfo.isCurrentMonth ? 'ring-2 ring-blue-400' : ''
                         } ${
                           dateInfo.isWeekend && dateInfo.isCurrentMonth ? 'bg-gray-50' : ''
                         }`}
                       >
                         {dateInfo.dayNumber}
                         {hasAvailableSlots && dateInfo.isCurrentMonth && !dateInfo.isPastDate && (
                           <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                         )}
                         {dateInfo.isToday && dateInfo.isCurrentMonth && (
                           <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                         )}
                       </button>
                     );
                   })}
                 </div>
                 <div className="mt-4 text-xs text-muted-foreground">
                   <div className="flex items-center gap-4">
                     <div className="flex items-center gap-1">
                       <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                       <span>Available</span>
                     </div>
                     <div className="flex items-center gap-1">
                       <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                       <span>Today</span>
                     </div>
                     <div className="flex items-center gap-1">
                       <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                       <span>No slots</span>
                     </div>
                   </div>
                 </div>
               </CardContent>
             </Card>

            {/* Time Slots */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-purple-600" />
                  Select Time
                </CardTitle>
                <CardDescription>
                  {selectedDate 
                    ? `Available time slots for ${new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}`
                    : 'Please select a date first'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedDate ? (
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => {
                      const isAvailable = selectedDateSlots.includes(time);
                      return (
                        <button
                          key={time}
                          onClick={() => isAvailable && handleTimeSelect(time)}
                          disabled={!isAvailable}
                          className={`p-3 text-sm rounded-lg transition-all ${
                            selectedTime === time
                              ? 'bg-purple-600 text-white'
                              : isAvailable
                              ? 'border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {time}
                          {isAvailable ? (
                            <CheckCircle className="w-3 h-3 ml-1 inline text-green-500" />
                          ) : (
                            <XCircle className="w-3 h-3 ml-1 inline text-red-400" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Select a date to see available time slots
                  </div>
                )}
                
                {selectedDate && selectedTime && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
                    <h4 className="font-medium text-gray-900 mb-2">Selected Appointment</h4>
                    <p className="text-sm text-gray-600">
                      📅 {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p className="text-sm text-gray-600">
                      🕒 {selectedTime} - {timeSlots[timeSlots.indexOf(selectedTime) + 1] || "16:00"} (30 minutes)
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Service Selection */}
        {step === 'details' && (
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Select Service Type</CardTitle>
                <CardDescription>
                  Choose the type of consultation you need
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(servicePricing).map(([service, price]) => (
                    <button
                      key={service}
                      onClick={() => handleServiceSelect(service)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        selectedService === service
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                                           <div className="flex justify-between items-start mb-2">
                       <h3 className="font-medium">{t(`appointment.service.${service.replace('-', '').replace('_', '')}`)}</h3>
                       <span className="text-lg font-bold text-blue-600">€{price}</span>
                     </div>
                     <p className="text-sm text-muted-foreground">
                       {t(`appointment.services.${service.replace('-', '').replace('_', '')}Desc`)}
                     </p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Payment & Contact Details */}
        {step === 'payment' && (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Euro className="h-5 w-5 text-green-600" />
                  Complete Booking
                </CardTitle>
                <CardDescription>
                  Fill in your details and complete payment
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Booking Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-6">
                  <h3 className="font-medium mb-3">Booking Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span>{new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span>{selectedTime} - {timeSlots[timeSlots.indexOf(selectedTime) + 1] || "16:00"}</span>
                    </div>
                                         <div className="flex justify-between">
                       <span>Service:</span>
                       <span>{t(`appointment.service.${selectedService.replace('-', '').replace('_', '')}`)}</span>
                     </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total:</span>
                      <span>€{selectedPrice}</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t("appointment.form.name")}</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder={t("appointment.form.namePlaceholder")}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t("appointment.form.email")}</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder={t("appointment.form.emailPlaceholder")}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("appointment.form.phone")}</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder={t("appointment.form.phonePlaceholder")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t("appointment.form.message")}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder={t("appointment.form.messagePlaceholder")}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      💳 <strong>Payment:</strong> You will be redirected to our secure payment processor to complete the €{selectedPrice} payment for your appointment.
                    </p>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : `Pay €${selectedPrice} & Book Appointment`}
                  </Button>

                  {submitStatus === 'success' && (
                    <div className="text-green-600 text-center font-medium">
                      🎉 {t("appointment.form.success")}
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="text-red-600 text-center font-medium">
                      ❌ {t("appointment.form.error")}
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={handlePreviousStep}
            disabled={step === 'datetime'}
            className={step === 'datetime' ? 'invisible' : ''}
          >
            Previous
          </Button>
          <Button
            onClick={handleNextStep}
            disabled={
              (step === 'datetime' && (!selectedDate || !selectedTime)) ||
              (step === 'details' && !selectedService)
            }
            className={step === 'payment' ? 'invisible' : ''}
          >
            Next
          </Button>
        </div>

        {/* Contact Information */}
        <div className="mt-12 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>{t("appointment.contact.title")}</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{t("appointment.contact.email")}</p>
                  <p className="text-muted-foreground">canbek0104@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{t("appointment.contact.location")}</p>
                  <p className="text-muted-foreground">Duisburg, Germany</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{t("appointment.contact.timezone")}</p>
                  <p className="text-muted-foreground">CET (UTC+1)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 