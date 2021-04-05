const getWindow = (): Window => (
    typeof window !== 'undefined' ? window : {} as Window
);

export default getWindow;