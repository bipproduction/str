'use client'
import MarkdownPreview from '@uiw/react-markdown-preview';

export default function ViewInfo({ data }: { data: string }) {
    return <div style={{
        paddingTop: 64
    }} >
        <MarkdownPreview  source={data} style={{
            padding: 16
        }} />
    </div>
}