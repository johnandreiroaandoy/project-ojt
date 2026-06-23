import React from 'react';

// Reusable Button Component
// This component can be used anywhere in the project.
// The props allow us to customize the button's text and behavior.
function Button({ children, onClick, type = "button" }) {
    return (
        // HTML button element
        <button
            // Specifies the button type:
            // "button" = normal button
            // "submit" = submits a form
            type={type}

            // Executes a function when the button is clicked
            onClick={onClick}

            // Tailwind CSS classes for styling
            className="
                w-full                  /* Makes the button take full width */
                bg-[#002B5B]            /* Dark blue background color */
                text-white              /* White text color */
                py-4                    /* Vertical padding */
                rounded-xl              /* Rounded corners */
                font-black              /* Extra bold text */
                uppercase               /* Converts text to uppercase */
                tracking-[0.2em]        /* Increases letter spacing */
                hover:bg-blue-900       /* Darker blue when hovered */
                transition-all          /* Smooth transition effect */
                shadow-md               /* Medium shadow effect */
                active:scale-95         /* Slightly shrinks when clicked */
            "
        >
            {/* 
                'children' represents the content placed inside the Button component.
                
                Example:
                <Button>Login</Button>

                children = "Login"
            */}
            {children}
        </button>
    );
}

// Makes the Button component available for use in other files
export default Button;