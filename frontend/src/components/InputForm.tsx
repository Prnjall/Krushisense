import React, { useState } from 'react';

interface InputFormProps {
  onSubmit: (data: any) => void;
  loading: boolean;
}

export default function InputForm({ onSubmit, loading }: InputFormProps) {
  const [form, setForm] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    ph: '',
    temperature: '',
    humidity: '',
    rainfall: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <input name="nitrogen" value={form.nitrogen} onChange={handleChange} placeholder="Nitrogen (N)" required className="input" />
        <input name="phosphorus" value={form.phosphorus} onChange={handleChange} placeholder="Phosphorus (P)" required className="input" />
        <input name="potassium" value={form.potassium} onChange={handleChange} placeholder="Potassium (K)" required className="input" />
        <input name="ph" value={form.ph} onChange={handleChange} placeholder="pH" required className="input" />
        <input name="temperature" value={form.temperature} onChange={handleChange} placeholder="Temperature (°C)" required className="input" />
        <input name="humidity" value={form.humidity} onChange={handleChange} placeholder="Humidity (%)" required className="input" />
        <input name="rainfall" value={form.rainfall} onChange={handleChange} placeholder="Rainfall (mm)" required className="input" />
      </div>
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Predicting...' : 'Predict Crop'}
      </button>
    </form>
  );
}
