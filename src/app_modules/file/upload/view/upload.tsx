'use client'

import toast from "react-simple-toasts"
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { Box, Group, Stack, Text, Title, rem } from "@mantine/core"

import { TbPhone, TbPhoto, TbUpload, TbX } from "react-icons/tb"

export function ViewUpload({ token, props }: { token: string, props: any }) {
    return <Dropzone
        onDrop={(files) => console.log('accepted files', files)}
        onReject={(files) => console.log('rejected files', files)}
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        {...props}
    >
        <Group position="center" spacing="xl" style={{ minHeight: rem(220), pointerEvents: 'none' }}>
            <Dropzone.Accept>
                <TbUpload
                    size="3.2rem"
                    stroke={1.5}
                />
            </Dropzone.Accept>
            <Dropzone.Reject>
                <TbX
                    size="3.2rem"
                    stroke={1.5}
                />
            </Dropzone.Reject>
            <Dropzone.Idle>
                <TbPhoto size="3.2rem" stroke={1.5} />
            </Dropzone.Idle>

            <div>
                <Text size="xl" inline>
                    Drag images here or click to select files
                </Text>
                <Text size="sm" color="dimmed" inline mt={7}>
                    Attach as many files as you like, each file should not exceed 5mb
                </Text>
            </div>
        </Group>
    </Dropzone>



    // <center style={{
    //     padding: 16,
    //     border: "1px dashed gray"
    // }} >
    //     <input  type="file" placeholder="file" onChange={async (val) => {
    //         if (!val || !val.currentTarget.files || !val.currentTarget.files[0]) return toast("empty file")
    //         const formData = new FormData()
    //         formData.append('file', val.currentTarget.files[0])
    //         const res = await fetch('/api/file/upl', {
    //             method: "POST",
    //             body: formData,
    //             headers: {
    //                 "Authorization": `Bearer ${token}`
    //             }
    //         })

    //         if (!res.ok) return toast("error response")
    //         const response = await res.json()
    //         if (!response.success) toast(response.message)
    //         toast(response.message)
    //     }} />
    // </center>
}