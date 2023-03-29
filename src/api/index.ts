import type { AxiosProgressEvent, GenericAbortSignal } from 'axios'
import { post } from '@/utils/request'
import { useSettingStore } from '@/store'

export function fetchChatAPI<T = any>(
  prompt: string,
  options?: { conversationId?: string; parentMessageId?: string },
  signal?: GenericAbortSignal,
) {
  return post<T>({
    url: '/chat',
    data: { prompt, options },
    signal,
  })
}

export function fetchChatConfig<T = any>() {
  return post<T>({
    url: '/config',
  })
}

export function fetchChatAPIProcess<T = any>(
  params: {
    prompt: string
    options?: { conversationId?: string; parentMessageId?: string }
    signal?: GenericAbortSignal
    onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void },
) {
  const settingStore = useSettingStore()

  return post<T>({
    url: '/chat-process',
    data: { prompt: params.prompt, options: params.options, systemMessage: settingStore.systemMessage },
    signal: params.signal,
    onDownloadProgress: params.onDownloadProgress,
  })
}

export function fetchSession<T>() {
  return post<T>({
    url: '/session',
  })
}

export function fetchVerify<T>(token: string) {
  return post<T>({
    url: '/verify',
    data: { token },
  })
}

export function upsertFile<T = any>(file: File) {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJDeWJlclp5Z290ZS1BSSIsIm5hbWUiOiJBcnRodXJhaW4gWmhlbmciLCJpYXQiOjE1MTYyMzkwMjJ9.UmFfxiVxXqY30aB0CNJLlIOQBgASbbJZsIdqk4VO58M'
  const param = new FormData()
  param.append('file', file)
  const headers = {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${token}`,
  }
  return post<T>({
    url: 'https://retrieval.cyberzygote.com/upsert-file',
    data: param,
    headers,
  })
}

export function queryPrompt<T = any>(question: string) {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJDeWJlclp5Z290ZS1BSSIsIm5hbWUiOiJBcnRodXJhaW4gWmhlbmciLCJpYXQiOjE1MTYyMzkwMjJ9.UmFfxiVxXqY30aB0CNJLlIOQBgASbbJZsIdqk4VO58M'
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }
  const param = {
    queries: [
      {
        query: question,
        top_k: 3,
      },
    ],
  }
  return post<T>({
    url: 'https://retrieval.cyberzygote.com/query',
    data: param,
    headers,
  })
}
