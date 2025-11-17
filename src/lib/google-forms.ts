// Update these with your actual Google Form entry IDs
const GOOGLE_FORMS_CONFIG = {
  order: {
    formId: 'YOUR_ORDER_FORM_ID_HERE',
    entries: {
      fullName: 'entry.XXXXX1',
      email: 'entry.XXXXX2',
      phone: 'entry.XXXXX3',
      productName: 'entry.XXXXX4',
      quantity: 'entry.XXXXX5',
      totalPrice: 'entry.XXXXX6',
      address: 'entry.XXXXX7',
    }
  },
  contact: {
    formId: 'YOUR_CONTACT_FORM_ID_HERE',
    entries: {
      fullName: 'entry.XXXXX1',
      email: 'entry.XXXXX2',
      phone: 'entry.XXXXX3',
      subject: 'entry.XXXXX4',
      message: 'entry.XXXXX5',
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
    `https://docs.google.com/forms/d/${GOOGLE_FORMS_CONFIG.order.formId}/formResponse`,
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
    `https://docs.google.com/forms/d/${GOOGLE_FORMS_CONFIG.contact.formId}/formResponse`,
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
