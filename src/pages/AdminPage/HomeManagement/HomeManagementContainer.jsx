import React from 'react';
import HeaderHeroSection from './HeaderHeroSection';
import CoreServicesSection from './CoreServicesSection';
import ContactLocationSection from './ContactLocationSection';

function HomeManagementContainer({ 
  headerState, setHeaderState, 
  servicesState, setServicesState, 
  contactState, setContactState, 
  onSave 
}) {
  return (
    <div className="space-y-12 divide-y divide-slate-100">
      
      {/* MODULE 1: GLOBAL NAVIGATION & HERO TEXT FIELDS */}
      <HeaderHeroSection 
        headerState={headerState} 
        setHeaderState={setHeaderState} 
        onSave={onSave} 
      />

      {/* MODULE 2: CITY & BARANGAY LEVEL TRANSACTION ARRAYS */}
      <div className="pt-10">
        <CoreServicesSection 
          servicesState={servicesState} 
          setServicesState={setServicesState} 
          onSave={onSave} 
        />
      </div>

      {/* MODULE 3: GEOGRAPHIC LOCATIONS & GATEWAY MATRIX */}
      <div className="pt-10">
        <ContactLocationSection 
          contactState={contactState} 
          setContactState={setContactState} 
          onSave={onSave} 
        />
      </div>

    </div>
  );
}

export default HomeManagementContainer;