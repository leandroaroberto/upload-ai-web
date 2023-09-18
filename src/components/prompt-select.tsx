import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { api } from '@/lib/axios'

interface Prompt {
    id: string
    title: string
    template: string
}

interface PromptSelectProps {
    onPromptSelected: (tempate: string) => void
}


function PromptSelect(props : PromptSelectProps) {

    const [ prompts, setPrompts ] = useState<Prompt[] | null>(null)

    useEffect(() => {
        api.get('/prompts').then((response) => {
            setPrompts(response.data)
        })
    },[])

    function handlePromptSelected(promptId: string) {
        const selectedPrompt = prompts?.find(prompt => prompt.id === promptId)

        if(! selectedPrompt) {
            return
        }

        props.onPromptSelected(selectedPrompt.template)
    }

  return (
    <Select onValueChange={handlePromptSelected}>
        <SelectTrigger>
            <SelectValue placeholder="select a prompt..."/>
        </SelectTrigger>
        <SelectContent>
            {
                prompts?.map((prompt) => {
                    return <SelectItem key={prompt.id} value={prompt.id}>{prompt.title}</SelectItem>
                })
            }
        </SelectContent>
    </Select>
  )
}

export default PromptSelect