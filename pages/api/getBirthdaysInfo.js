
async function getBirthdaysInfo() {
  try {
    const resp = await fetch('https://birthday-app-api.vercel.app/api/v1/john/birthdays')
    console.log("response", resp)
    
    const data = await resp.json()
    console.log('data:', data)
    return data

  } catch(error) {
    console.log(error)
  }
}

export default getBirthdaysInfo;