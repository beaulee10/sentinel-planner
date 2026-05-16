import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { TaskTitleStep } from './wizard-steps/TaskTitleStep';
import { ImplementationIntentionStep } from './wizard-steps/ImplementationIntentionStep';
import { EstimateStep } from './wizard-steps/EstimateStep';
import { SentinelSuggestionStep } from './wizard-steps/SentinelSuggestionStep';
import { Button } from './ui/button';

interface TaskWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated: (task: NewTask) => void;
}

export interface NewTask {
  title: string;
  userEstimate: number;
  adjustedEstimate: number;
  category: string;
  implementationTime?: string;
  implementationLocation?: string;
}

export function TaskWizard({ isOpen, onClose, onTaskCreated }: TaskWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [taskTitle, setTaskTitle] = useState('');
  const [userEstimate, setUserEstimate] = useState(30);
  const [category, setCategory] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = (adjustedEstimate: number) => {
    onTaskCreated({
      title: taskTitle,
      userEstimate,
      adjustedEstimate,
      category,
      implementationTime: selectedTime,
      implementationLocation: selectedLocation,
    });
    handleClose();
  };

  const handleClose = () => {
    setCurrentStep(1);
    setTaskTitle('');
    setUserEstimate(30);
    setCategory('');
    setSelectedTime('');
    setSelectedLocation('');
    onClose();
  };

  const canProceedStep1 = taskTitle.trim().length > 0 && category.length > 0;
  const canProceedStep2 = selectedTime.length > 0 && selectedLocation.length > 0;
  const canProceedStep3 = userEstimate > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={handleClose}
          />

          {/* Wizard Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold">Add New Task</h2>
                  </div>
                  <button
                    onClick={handleClose}
                    className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Step Indicator */}
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex items-center gap-2 flex-1">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          step <= currentStep
                            ? 'bg-white flex-1'
                            : 'bg-white/30 flex-1'
                        }`}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex items-center gap-2 text-sm text-white/90">
                  <span className="font-semibold">Step {currentStep} of 4:</span>
                  <span>
                    {currentStep === 1 && 'Task Details'}
                    {currentStep === 2 && 'Implementation Intent'}
                    {currentStep === 3 && 'Time Estimate'}
                    {currentStep === 4 && 'Mindful Uplift'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 min-h-[400px] max-h-[600px] overflow-y-auto">
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <TaskTitleStep
                      taskTitle={taskTitle}
                      setTaskTitle={setTaskTitle}
                      category={category}
                      setCategory={setCategory}
                    />
                  )}
                  {currentStep === 2 && (
                    <ImplementationIntentionStep
                      taskTitle={taskTitle}
                      selectedTime={selectedTime}
                      setSelectedTime={setSelectedTime}
                      selectedLocation={selectedLocation}
                      setSelectedLocation={setSelectedLocation}
                    />
                  )}
                  {currentStep === 3 && (
                    <EstimateStep
                      userEstimate={userEstimate}
                      setUserEstimate={setUserEstimate}
                      taskTitle={taskTitle}
                    />
                  )}
                  {currentStep === 4 && (
                    <SentinelSuggestionStep
                      taskTitle={taskTitle}
                      userEstimate={userEstimate}
                      category={category}
                      onFinish={handleFinish}
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              {currentStep < 4 && (
                <div className="border-t border-gray-200 p-6 flex items-center justify-between bg-gray-50">
                  <Button
                    variant="outline"
                    onClick={currentStep === 1 ? handleClose : handleBack}
                    className="gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {currentStep === 1 ? 'Cancel' : 'Back'}
                  </Button>

                  <Button
                    onClick={handleNext}
                    disabled={
                      (currentStep === 1 && !canProceedStep1) ||
                      (currentStep === 2 && !canProceedStep2) ||
                      (currentStep === 3 && !canProceedStep3)
                    }
                    className="gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    Next Step
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
