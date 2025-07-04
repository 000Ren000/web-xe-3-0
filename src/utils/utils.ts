export interface iFood {
  name: string;
  carbohydrates: number;
}

export interface iFormData {

  carbohydrates: string;
  dryWeight: string;
  finishedProductWeight: string;
}

// Интерфейс для ответа API
export interface ApiResponse {
  foods: iFood[];
}

// Интерфейс для ответа при добавлении продукта
export interface AddProductResponse {
  food: iFood;
}

export const Foods: iFood[] = [
  {
    name: 'Грека',
    carbohydrates: 73.8,
  },
  {
    name: 'Перловка',
    carbohydrates: 65.95,
  },
  {
    name: 'Бурый рис',
    carbohydrates: 69.65,
  },
  {
    name: 'Макароны',
    carbohydrates: 70.4,
  },
];

export const getFoodsLocal = (): iFood[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('Foods');
    return stored ? JSON.parse(stored) : Foods;
  } else {
    return Foods;
  }
};

export const setFoodsLocal = (products: iFood[]): void => {
  if (window) localStorage.setItem('Foods', JSON.stringify(products));
};

export const getProducts = (setFoods: (foods: iFood[]) => void): void => {
  //  fetch('https://food-api-8cgu.onrender.com/getall')
  // fetch('http://localhost:5877/getall')
  fetch('https://food-api-8cgu.onrender.com/getall')
    .then((resp) => {
      resp.json().then((data: ApiResponse): void => {
        setFoods(data.foods);
        setFoodsLocal(data.foods);
      });
    })
    .catch((e) => {
      console.log('Ошибка получения продуктов:', e);
    });
};

export const addProduct = (productData = {}, changeElement: (name: string) => void) => {
  //  fetch('https://food-api-8cgu.onrender.com/create');
  // fetch('http://localhost:5877/create', {
  fetch('https://food-api-8cgu.onrender.com/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  })
    .then((resp) => {
      resp.json().then((data: AddProductResponse) => {
        changeElement(data.food.name);
      });
    })
    .catch((e) => {
      console.log('Ошибка при добавлении продукта:', e);
    });
};
