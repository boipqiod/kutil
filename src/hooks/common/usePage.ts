import { useRouter } from 'next/router';

export const usePage = () => {
  const router = useRouter();

  return{
    toMain: async () => { await router.push('/'); },
    toUrl: async (url: string) => { await router.push(url)},
    toBack: async () => { await router.back(); },
  }
}
