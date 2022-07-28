import React from "react";

const Measurements = () => {
  return (
    <div>
      <h2>Dodanie głównego pomiaru</h2>
      <p>masa ciała</p>
      <p>bmi</p>
      <button>dodatkowe dane pomiaru (bioimpedancja, talia, whr itd..)</button>
      <p>po zapisaniu klienta - zapisanie pierwszego pomiaru</p>
      <p>jeśli nie dodano masy ciała (niedostępne następne steps)</p>
      <p>ustawienie jako główny pomiar</p>
      <p>
        można zmienić datę, lecz daty innych pomiarów dla tego klienta muszą być
        późniejsze
      </p>
    </div>
  );
};

export default Measurements;
