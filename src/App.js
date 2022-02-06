import './App.css';
import React from "react";
import Header from "./Header"
import Hero from "./Hero";
import Form from "./Form";

export default function App() {
  return (
    <div>
      <Header />
      <h2 className="subtitle1" data-aos="flip-up" data-aos-duration="1000">Why book with us?</h2>
      <Hero />
      <Form />
    </div>
  );
}
