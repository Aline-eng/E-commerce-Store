import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'How do I place an order?',
      answer: 'Browse our products, add items to your cart, and proceed to checkout. You\'ll need to create an account or log in to complete your purchase.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and other secure payment methods.'
    },
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 5-7 business days. Express shipping is available and takes 2-3 business days. International shipping times vary by location.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy. Items must be unworn, unwashed, and in original condition with tags attached. Return shipping is free for defective items.'
    },
    {
      question: 'How do I track my order?',
      answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also track your order by logging into your account and viewing your order history.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to over 100 countries worldwide. Shipping costs and delivery times vary by location.'
    },
    {
      question: 'How do I contact customer support?',
      answer: 'You can reach us via email at support@shop.co, call us at +1 (555) 123-4567, or use the contact form on our Contact Us page.'
    },
    {
      question: 'Can I cancel or modify my order?',
      answer: 'Orders can be cancelled or modified within 1 hour of placement. After that, please contact customer support for assistance.'
    },
    {
      question: 'Are your products authentic?',
      answer: 'Yes, all our products are 100% authentic and sourced directly from authorized distributors and brands.'
    },
    {
      question: 'Do you offer gift cards?',
      answer: 'Yes, we offer digital gift cards in various denominations. They can be purchased on our website and sent via email.'
    }
  ];

  return (
    <div className="min-h-screen py-16 bg-white dark:bg-black">
      <div className="container max-w-4xl px-4 mx-auto">
        <h1 className="mb-4 text-3xl font-black text-gray-900 dark:text-white">Frequently Asked Questions</h1>
        <p className="mb-12 text-md gray-700 text- dark:text-gray-300">
          Find answers to common questions about our products, shipping, and policies.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden border border-gray-200 rounded-lg dark:border-gray-800"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex items-center justify-between w-full p-6 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {faq.question}
                </span>
                <span className="text-2xl text-gray-600 dark:text-gray-400">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-700 dark:text-gray-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
