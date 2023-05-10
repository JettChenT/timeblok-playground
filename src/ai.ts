import axios from 'axios'
import { useTimeBlokStore, ChatHistoryEntry } from './state'

const API_URL = "https://timeblok-production.up.railway.app"

export const get_auth = () => {
    const access_key = useTimeBlokStore.getState().access_key;
    const openai_key = useTimeBlokStore.getState().openai_key;
    if (access_key && access_key !== "") {
        return {"access_key": access_key};
    } else if (openai_key && openai_key !== "") {
        return {"openai_key": openai_key};
    }
    return null;
}

export interface ChatResponse{
    content: string,
    parsed: string,
}

export const chat = (message: string): Promise<ChatResponse> => {
    return axios.post(`${API_URL}/chat`, {
      "auth": get_auth(),
      "entries": [
        {"role":"user", "content": message}
      ]
    }).then((response) => {
      const dat = response.data;
      const content = dat.content;
      const parsed = dat.parsed;
      return {content, parsed} as ChatResponse;
    });
}

export const new_tb = (message: string): Promise<ChatResponse> => {
    return chat(`new: ${message}`);
}

export const edit_tb = (orig:string, message: string): Promise<ChatResponse> => {
    return chat(`Current program:\`\`\`timeblok\n${orig}\n\`\`\`\nedit: ${message}`);
}