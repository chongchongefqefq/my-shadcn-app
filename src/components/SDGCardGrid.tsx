"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const sdgData = Array.from({ length: 17 }, (_, i) => ({
  id: i + 1,
  title: [
    "No Poverty",
    "Zero Hunger",
    "Good Health and Well-being",
    "Quality Education",
    "Gender Equality",
    "Clean Water and Sanitation",
    "Affordable and Clean Energy",
    "Decent Work and Economic Growth",
    "Industry, Innovation and Infrastructure",
    "Reduced Inequalities",
    "Sustainable Cities and Communities",
    "Responsible Consumption and Production",
    "Climate Action",
    "Life Below Water",
    "Life on Land",
    "Peace, Justice and Strong Institutions",
    "Partnerships for the Goals",
  ][i],
  description: [
    "Eradicate poverty in all its forms everywhere.",
    "End hunger, achieve food security, and improve nutrition.",
    "Ensure healthy lives and promote well-being for all ages.",
    "Ensure inclusive and quality education for all.",
    "Achieve gender equality and empower all women and girls.",
    "Ensure availability and sustainable management of water.",
    "Ensure access to affordable, reliable, and modern energy.",
    "Promote sustained, inclusive and sustainable economic growth.",
    "Build resilient infrastructure and foster innovation.",
    "Reduce inequality within and among countries.",
    "Make cities inclusive, safe, resilient and sustainable.",
    "Ensure sustainable consumption and production patterns.",
    "Take urgent action to combat climate change and its impacts.",
    "Conserve and sustainably use oceans, seas and marine resources.",
    "Protect, restore and promote sustainable use of terrestrial ecosystems.",
    "Promote peaceful and inclusive societies for sustainable development.",
    "Strengthen the means of implementation and revitalize global partnerships.",
  ][i],
  image: `/images/E-WEB-Goal-${String(i + 1).padStart(2, "0")}.png`,
}));

export default function SDGCardGrid() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleNext = () => {
    if (openIndex !== null) {
      setOpenIndex((openIndex + 1) % sdgData.length);
    }
  };

  const handlePrev = () => {
    if (openIndex !== null) {
      setOpenIndex((openIndex - 1 + sdgData.length) % sdgData.length);
    }
  };

  return (
    <section className="py-16 px-6 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10 text-green-600">
        The 17 Sustainable Development Goals
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {sdgData.map((goal, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, rotate: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.12 }}
            onClick={() => setOpenIndex(index)}
            className="cursor-pointer transition-all"
          >
            <Card className="hover:shadow-green-400 transition-shadow">
              <CardHeader className="flex justify-center items-center py-4">
                <img
                  src={goal.image}
                  alt={goal.title}
                  className="w-20 h-20 object-contain"
                />
              </CardHeader>
              <CardContent className="text-center text-sm font-semibold text-gray-800">
                {goal.title}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <Dialog open={true} onOpenChange={() => setOpenIndex(null)}>
            <DialogContent className="backdrop-blur-md bg-white/70 max-w-lg rounded-2xl shadow-2xl">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="p-6 text-center"
              >
                <img
                  src={sdgData[openIndex].image}
                  alt={sdgData[openIndex].title}
                  className="w-32 h-32 mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {sdgData[openIndex].title}
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  {sdgData[openIndex].description}
                </p>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePrev}>
                    Previous
                  </Button>
                  <Button variant="outline" onClick={handleNext}>
                    Next
                  </Button>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  );
}
