const hamburger = document.getElementById('hamburger');
const hamburgerDropdown = document.getElementById('hamburgerDropdown');
const minPriceInput = document.getElementById('minPriceInput');
const maxPriceInput = document.getElementById('maxPriceInput');
const pickupDate = document.getElementById('pickupDate');
const searchBtn = document.getElementById('searchBtn');
const locationSelect = document.getElementById('locationSelect');
const locLabel = document.getElementById('current-loc-label');
const container = document.getElementById('car-listings');

// Assets
const placeholderImg = "https://static.vecteezy.com/system/resources/thumbnails/049/873/550/small/fast-moving-car-journey-photo.jpeg";
const driverImg = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop";

const carData = [
    { name: "Toyota Vios", type: "Economy", body: "Sedan", seats: 5, trans: ["MT", "CVT"], price: 1500, img: placeholderImg },
    { name: "Mitsubishi Mirage G4", type: "Economy", body: "Sedan", seats: 5, trans: ["MT", "CVT"], price: 1400, img: placeholderImg },
    { name: "Kia Soluto", type: "Economy", body: "Sedan", seats: 5, trans: ["MT", "AT"], price: 1450, img: placeholderImg },
    { name: "Suzuki Dzire", type: "Economy", body: "Sedan", seats: 5, trans: ["MT", "CVT"], price: 1350, img: placeholderImg },
    { name: "Honda City", type: "Economy", body: "Compact Sedan", seats: 5, trans: ["CVT"], price: 1800, img: placeholderImg },
    { name: "Suzuki S-Presso", type: "Compact", body: "Mini SUV", seats: 5, trans: ["MT", "AT"], price: 1200, img: placeholderImg },
    { name: "Toyota Wigo", type: "Compact", body: "Hatchback", seats: 5, trans: ["MT", "CVT"], price: 1100, img: placeholderImg },
    { name: "Chevrolet Spark", type: "Compact", body: "Hatchback", seats: 5, trans: ["MT", "CVT"], price: 1300, img: placeholderImg },
    { name: "Honda Brio", type: "Compact", body: "Hatchback", seats: 5, trans: ["MT", "CVT"], price: 1400, img: placeholderImg },
    { name: "Suzuki Celerio", type: "Compact", body: "Hatchback", seats: 5, trans: ["MT", "AT"], price: 1150, img: placeholderImg },
    { name: "Toyota Camry", type: "Standard", body: "Mid-size Sedan", seats: 5, trans: ["AT"], price: 4500, img: placeholderImg },
    { name: "Honda Accord", type: "Standard", body: "Mid-size Sedan", seats: 5, trans: ["AT"], price: 4600, img: placeholderImg },
    { name: "Honda Civic", type: "Standard", body: "Compact Sedan", seats: 5, trans: ["MT", "CVT"], price: 2500, img: placeholderImg },
    { name: "Mazda 6", type: "Standard", body: "Mid-size Sedan", seats: 5, trans: ["AT"], price: 4200, img: placeholderImg },
    { name: "Toyota Corolla Altis", type: "Standard", body: "Compact Sedan", seats: 5, trans: ["CVT"], price: 2400, img: placeholderImg },
    { name: "Toyota Innova", type: "People Carrier", body: "MPV", seats: 7, trans: ["AT", "MT"], price: 2800, img: placeholderImg },
    { name: "Toyota Avanza", type: "People Carrier", body: "MPV", seats: 7, trans: ["CVT", "MT"], price: 2200, img: placeholderImg },
    { name: "Mitsubishi Xpander", type: "People Carrier", body: "MPV", seats: 7, trans: ["AT", "MT"], price: 2400, img: placeholderImg },
    { name: "Hyundai Stargazer", type: "People Carrier", body: "MPV", seats: 7, trans: ["AT"], price: 2500, img: placeholderImg },
    { name: "Suzuki Ertiga Hybrid", type: "People Carrier", body: "MPV", seats: 7, trans: ["AT", "MT"], price: 2300, img: placeholderImg },
    { name: "BMW X5", type: "Luxury", body: "Mid-size SUV", seats: 5, trans: ["AT"], price: 9500, img: placeholderImg },
    { name: "BMW Z4", type: "Luxury", body: "Roadster", seats: 2, trans: ["AT", "MT"], price: 11000, img: placeholderImg },
    { name: "Lexus NX", type: "Luxury", body: "Luxury SUV", seats: 5, trans: ["CVT"], price: 8500, img: placeholderImg },
    { name: "Mercedes-Benz CLA", type: "Luxury", body: "Luxury Sedan", seats: 5, trans: ["AT"], price: 7500, img: placeholderImg },
    { name: "Porsche 911", type: "Luxury", body: "Sports Car", seats: 4, trans: ["PDK", "MT"], price: 18000, img: placeholderImg }
];

// Hamburger Menu Logic
hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.toggle('open');
    hamburgerDropdown.classList.toggle('open');
});

document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !hamburgerDropdown.contains(e.target)) {
        hamburger.classList.remove('open');
        hamburgerDropdown.classList.remove('open');
    }
});

// Update Map Label
locationSelect.addEventListener('change', () => {
    locLabel.innerText = locationSelect.options[locationSelect.selectedIndex].text;
});

// Set Min Date to Today
const today = new Date().toISOString().split('T')[0];
pickupDate.setAttribute('min', today);
pickupDate.value = today;

function renderCars() {
    const minPrice = parseInt(minPriceInput.value) || 0;
    const maxPrice = parseInt(maxPriceInput.value) || Infinity;
    
    const selectedTypes = Array.from(document.querySelectorAll('#type-filters input:checked')).map(cb => cb.value);
    const selectedTrans = Array.from(document.querySelectorAll('#trans-filters input:checked')).map(cb => cb.value);
    const selectedSeats = Array.from(document.querySelectorAll('#seat-filters input:checked')).map(cb => parseInt(cb.value));
    
    container.innerHTML = '';

    const filteredCars = carData.filter(car => {
        const matchesPrice = car.price >= minPrice && car.price <= maxPrice;
        const matchesType = selectedTypes.includes(car.type);
        
        const matchesTrans = car.trans.some(t => {
            const isAuto = t.includes("AT") || t.includes("CVT") || t.includes("PDK");
            const isManual = t.includes("MT");
            if (selectedTrans.includes("Automatic") && isAuto) return true;
            if (selectedTrans.includes("Manual") && isManual) return true;
            return false;
        });

        const matchesSeats = selectedSeats.some(s => {
            if (s === 7) return car.seats >= 7;
            return car.seats === s;
        });

        return matchesPrice && matchesType && matchesTrans && matchesSeats;
    });

    if (filteredCars.length === 0) {
        container.innerHTML = `
            <div class="bg-white p-12 text-center rounded border border-dashed border-gray-300 text-gray-400 font-bold uppercase text-xs tracking-widest">
                <i class="fa-solid fa-car-side text-3xl mb-4 block opacity-20"></i>
                No matching vehicles found
            </div>`;
        return;
    }

    filteredCars.forEach(car => {
        container.innerHTML += `
            <div class="car-card bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col sm:flex-row shadow-sm">
                <div class="sm:w-1/3 p-4 flex items-center justify-center bg-gray-50/50">
                    <img src="${car.img}" alt="${car.name}" class="w-full h-40 object-cover rounded shadow-inner">
                </div>
                <div class="flex-1 p-6 flex flex-col justify-between">
                    <div>
                        <div class="flex justify-between items-start">
                            <h2 class="text-xl font-bold" style="font-family: 'Montserrat';">${car.name}</h2>
                            <span class="text-[9px] font-bold px-2 py-1 bg-gray-100 rounded text-gray-500 uppercase tracking-wider">${car.type}</span>
                        </div>
                        <div class="driver-badge">
                            <img src="${driverImg}" class="driver-img" alt="Driver">
                            <span class="driver-text">Verified Driver Assigned</span>
                        </div>
                        <div class="grid grid-cols-2 gap-4 mt-4 text-xs">
                            <div class="flex items-center gap-2 text-gray-500">
                                <i class="fa-solid fa-car w-4"></i> <span>${car.body}</span>
                            </div>
                            <div class="flex items-center gap-2 text-gray-500">
                                <i class="fa-solid fa-users w-4"></i> <span>${car.seats} Seats</span>
                            </div>
                            <div class="flex items-center gap-2 text-gray-500">
                                <i class="fa-solid fa-gears w-4"></i> <span>${car.trans.join('/')}</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-between items-center mt-6 pt-4 border-t border-gray-50">
                        <div>
                            <p class="text-[10px] text-gray-400 font-bold uppercase mb-0">Daily Rate</p>
                            <p class="text-lg font-black accent-color">Php ${car.price.toLocaleString()}.00</p>
                        </div>
                        <button class="bg-[#fdeedc] hover:bg-[#fadbb7] text-[#8b5e34] px-8 py-2 rounded-lg text-xs font-bold transition-all uppercase tracking-wider">Book Now</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Event Listeners
minPriceInput.addEventListener('input', renderCars);
maxPriceInput.addEventListener('input', renderCars);
document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.addEventListener('change', renderCars));
searchBtn.addEventListener('click', renderCars);

// Initial Render
renderCars();