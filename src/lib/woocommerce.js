const API_URL =
 import.meta.env.VITE_WC_URL;

const USERNAME = import.meta.env.VITE_NAME;

const PASSWORD =
  import.meta.env.VITE_PASSWORD;


export async function getProducts() {

  const response = await fetch(API_URL, {

    method: "GET",

    headers: {
      Authorization:
        "Basic " +
        btoa(`${USERNAME}:${PASSWORD}`),
    },

  });

  if (!response.ok) {

    throw new Error(
      `WooCommerce Error: ${response.status}`
    );

  }

  return response.json();
}