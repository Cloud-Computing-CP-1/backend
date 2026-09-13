import axios from "axios"
export const WithRetry = async <T>(fn:()=>Promise<T>, maxRetry = 5, retryCount = 0, intilaDelay = 1000):Promise<T> => {
    try {
        return await fn();
    } catch (error) {
        if (!axios.isAxiosError(error)) {
            throw error
        }
        const status = error.response?.status;
        const retryable = [500, 502, 503, 504];
        if (!status || !retryable.includes(status)) {
            throw error
        }
        if (retryCount >= maxRetry) throw error
        const maxDelay = 8000;
        const backoff = Math.min(intilaDelay * Math.pow(2, retryCount), maxDelay)
        const jitter = Math.random() * backoff;
        console.log(
            `Retry ${retryCount + 1}`,
            `Backoff: ${backoff}ms`,
            `Actual wait: ${Math.floor(jitter)}ms`
        );
        await new Promise(resolve =>
            setTimeout(resolve, jitter)
        );
        return WithRetry(fn, maxRetry, retryCount + 1, intilaDelay)
    }
}