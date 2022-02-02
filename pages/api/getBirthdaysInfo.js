async function getBirthdaysInfo() {
  try {
    const resp = await fetch(
      "https://birthday-app-api.vercel.app/api/v1/john/birthdays"
    );
    const data = await resp.json();
    return data;
    
  } catch (error) {
    if (error) {
      return {
        notFound: true,
      };
    }
    console.log(error);
  }
}

export default getBirthdaysInfo;
