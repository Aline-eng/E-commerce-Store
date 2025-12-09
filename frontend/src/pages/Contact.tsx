import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen py-16 bg-white dark:bg-black">
      <div className="container px-4 mx-auto max-w-4xl">
        <h1 className="mb-8 text-5xl font-black text-gray-900 dark:text-white">Contact Us</h1>
        
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Get In Touch</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Have a question or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Email</h3>
                <p className="text-gray-700 dark:text-gray-300">support@shop.co</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Phone</h3>
                <p className="text-gray-700 dark:text-gray-300">+1 (555) 123-4567</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Address</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  123 Fashion Street<br />
                  New York, NY 10001<br />
                  United States
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 font-medium text-gray-900 dark:text-white">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-900 dark:text-white">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-900 dark:text-white">Subject</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-900 dark:text-white">Message</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="input-field"
              />
            </div>
            <button type="submit" className="w-full btn-primary">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
