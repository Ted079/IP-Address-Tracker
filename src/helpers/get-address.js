export async function getAddress(ip = "08.08.08.08") {
  const response = await fetch(
    `https://ipgeolocation.abstractapi.com/v1/?api_key=67cef75656de496f9362ba7c5bb90e1c&ip_address=${ip}`
  );
  return await response.json();
}
