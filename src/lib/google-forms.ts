// Update these with your actual Google Form entry IDs
const GOOGLE_FORMS_CONFIG = {
  order: {
    formId: '1FAIpQLSf79aNZGdjcJVEhhO1p9fsrmewa8j6nZcsg-kaZadfa4pDUkA',
    entries: {
      fullName: 'entry.1181491362',
      email: 'entry.1615706603',
      phone: 'entry.448040917',
      productName: 'entry.1491776181',
      quantity: 'entry.1907570498',
      totalPrice: 'entry.1161999179',
      address: 'entry.2023113311',
    }
  },
  contact: {
    formId: '1FAIpQLSddDTpSIFRiWru85IENiFhLMt914Qe7GXOjbAUjN3ycCLFddA',
    entries: {
      fullName: 'entry.1399187055',
      email: 'entry.2130208457',
      phone: 'entry.1474697617',
      subject: 'entry.1439950613',
      message: 'entry.1566455217',
    }
  }
}

interface OrderData {
  fullName: string
  email: string
  phone: string
  productName: string
  quantity: string
  totalPrice: string
  address: string
}

interface ContactData {
  fullName: string
  email: string
  phone: string
  subject: string
  message: string
}

export async function submitOrderToGoogleForm(data: OrderData): Promise<void> {
  const formData = new FormData()
  
  formData.append(GOOGLE_FORMS_CONFIG.order.entries.fullName, data.fullName)
  formData.append(GOOGLE_FORMS_CONFIG.order.entries.email, data.email)
  formData.append(GOOGLE_FORMS_CONFIG.order.entries.phone, data.phone)
  formData.append(GOOGLE_FORMS_CONFIG.order.entries.productName, data.productName)
  formData.append(GOOGLE_FORMS_CONFIG.order.entries.quantity, data.quantity)
  formData.append(GOOGLE_FORMS_CONFIG.order.entries.totalPrice, data.totalPrice)
  formData.append(GOOGLE_FORMS_CONFIG.order.entries.address, data.address)

  const response = await fetch(
    `https://docs.google.com/forms/d/e/${GOOGLE_FORMS_CONFIG.order.formId}/formResponse`,
    {
      method: 'POST',
      body: formData,
      mode: 'no-cors',
    }
  )

  if (!response.ok && response.type !== 'opaque') {
    throw new Error('Failed to submit order. Please try again.')
  }
}

export async function submitContactToGoogleForm(data: ContactData): Promise<void> {
  const formData = new FormData()
  
  formData.append(GOOGLE_FORMS_CONFIG.contact.entries.fullName, data.fullName)
  formData.append(GOOGLE_FORMS_CONFIG.contact.entries.email, data.email)
  formData.append(GOOGLE_FORMS_CONFIG.contact.entries.phone, data.phone)
  formData.append(GOOGLE_FORMS_CONFIG.contact.entries.subject, data.subject)
  formData.append(GOOGLE_FORMS_CONFIG.contact.entries.message, data.message)

  const response = await fetch(
    `https://docs.google.com/forms/d/e/${GOOGLE_FORMS_CONFIG.contact.formId}/formResponse`,
    {
      method: 'POST',
      body: formData,
      mode: 'no-cors',
    }
  )

  if (!response.ok && response.type !== 'opaque') {
    throw new Error('Failed to submit message. Please try again.')
  }
}
