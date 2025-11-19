// Update these with your actual Google Form entry IDs
const GOOGLE_FORMS_CONFIG = {
  order: {
    formId: '1FAIpQLSehykP2F8XG-aI0KGnW8O57t04x9kdq5TPsSOosWAo51eCf1Q',
    entries: {
      fullName: 'entry.1144702813',
      email: 'entry.849742991',
      phone: 'entry.59071613',
      productName: 'entry.964150792',
      quantity: 'entry.198823292',
      totalPrice: 'entry.1027556372',
      address: 'entry.2134109441',
    }
  },
  contact: {
    formId: '1FAIpQLSedwpIJj6r4RziAE7140UvpPPKOf7cjCNxW0ubnUHkmyeMA3g',
    entries: {
      fullName: 'entry.1976625530',
      email: 'entry.1575659615',
      phone: 'entry.1677825737',
      subject: 'entry.1567701882',
      message: 'entry.33884328',
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
