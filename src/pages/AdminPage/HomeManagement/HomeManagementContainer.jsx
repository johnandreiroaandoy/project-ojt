import React from 'react';
import HeaderHeroSection from './HeaderHeroSection';
import CoreServicesSection from './CoreServicesSection';
import ContactLocationSection from './ContactLocationSection';

function HomeManagementContainer({ baseUrl, onSave }) {
  return (
    <div className="space-y-12 divide-y divide-slate-100">
      
      {/* MODULE 1: GLOBAL NAVIGATION & HERO TEXT FIELDS */}
      <HeaderHeroSection 
        baseUrl={baseUrl}
        onSave={onSave} 
      />

      {/* MODULE 2: CITY & BARANGAY LEVEL TRANSACTION ARRAYS */}
      <div className="pt-10">
        <CoreServicesSection 
          baseUrl={baseUrl}
          onSave={onSave} 
        />
      </div>

      {/* MODULE 3: GEOGRAPHIC LOCATIONS & GATEWAY MATRIX */}
      <div className="pt-10">
        <ContactLocationSection 
          baseUrl={baseUrl}
          onSave={onSave} 
        />
      </div>

    </div>
  );
}

export default HomeManagementContainer;
