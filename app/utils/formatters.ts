export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) {
    return ''
  }

  const date = new Date(dateString)
  const day: string = String(date.getDate()).padStart(2, '0')
  const month: string = String(date.getMonth() + 1).padStart(2, '0')
  const year: number = date.getFullYear()

  return `${day}/${month}/${year}`
}