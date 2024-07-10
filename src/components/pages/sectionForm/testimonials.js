import React, { useState, useEffect } from "react";
import close from "../../Asset/close.png";
import './testimonials.css'

const Testimonials = ({ formData, handleChange }) => {
  const [testimonials, setTestimonials] = useState(
    formData.testimonials || [
      { name: "", company: "", designation: "", testimonial: "" },
      { name: "", company: "", designation: "", testimonial: "" },
    ]
  );
  const [isFillingStarted, setIsFillingStarted] = useState(false);

  // Update the testimonials state with stored data if available
  useEffect(() => {
    if (formData.testimonials) {
      setTestimonials(formData.testimonials);
    }
  }, [formData.testimonials]);

  const handleTestimonialChange = (index, field, value) => {
    const updatedTestimonials = [...testimonials];
    updatedTestimonials[index][field] = value;
    setTestimonials(updatedTestimonials);
    handleChange({
      target: {
        name: "testimonials",
        value: updatedTestimonials,
      },
    });
    setIsFillingStarted(true); // Set to true once any field is filled
  };

  const addTestimonialRow = () => {
    if (testimonials.length < 4) {
      setTestimonials([
        ...testimonials,
        { name: "", company: "", designation: "", testimonial: "" },
      ]);
    }
  };

  const removeTestimonialRow = (index) => {
    const updatedTestimonials = [...testimonials];
    updatedTestimonials.splice(index, 1);
    setTestimonials(updatedTestimonials);
    handleChange({
      target: {
        name: "testimonials",
        value: updatedTestimonials,
      },
    });
  };


  // Conditionally add testimonial rows if less than two testimonials are present
  useEffect(() => {
    if (testimonials.length < 2) {
      addTestimonialRow();
    }
  }, [testimonials]);

  return (
    <>
      <div className="sectionForm-testimonials-container">
        <label>
          Do you have any testimonials or success stories from these clients?
          List at least 2 of them.{" "}
        </label>
        {testimonials.map((testimonial, index) => (
            <div key={index} className="sectionForm-testimonial-row">
                {testimonials.length > 2 && (
                <div
                className="close-button"
                type="button"
                onClick={() => removeTestimonialRow(index)}
                
              >
                <img src={close} alt="close" style={{ width: "100%", height: "100%", padding:"30%"}} />
              </div>
              
              )}
              <label>Testimonial {` ${index + 1}`}</label>
              <input
                type="text"
                placeholder={`Name `}
                value={testimonial.name}
                onChange={(e) =>
                  handleTestimonialChange(index, "name", e.target.value)
                }
                required={isFillingStarted} // Make it required if filling started
              />
              <input
                type="text"
                placeholder={`Company `}
                value={testimonial.company}
                onChange={(e) =>
                  handleTestimonialChange(index, "company", e.target.value)
                }
                // required={isFillingStarted} // Make it required if filling started
              />
              <input
                type="text"
                placeholder={`Designation `}
                value={testimonial.designation}
                onChange={(e) =>
                  handleTestimonialChange(index, "designation", e.target.value)
                }
                // required={isFillingStarted} // Make it required if filling started
              />
              
              <textarea
                placeholder={`Testimonial `}
                value={testimonial.testimonial}
                onChange={(e) =>
                  handleTestimonialChange(index, "testimonial", e.target.value)
                }
                required={isFillingStarted} // Make it required if filling started
              ></textarea>
            </div>
        ))}
        {testimonials.length < 4 && (
          <>
            <button
              className="add-row-button"
              type="button"
              onClick={addTestimonialRow}
            >
              Add Testimonial
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Testimonials;
