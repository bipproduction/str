'use client'
import { Group, Stack, Text, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { File } from '@prisma/client';
import { funUpload } from './fun/upload';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useRouter } from 'next/navigation';

export default function ViewCreate({ user }: { user: File }) {
    const router = useRouter()
    return (
        <Stack p={"lg"}>
            <Dropzone
                onDrop={async (files) => {
                    const fl = new FormData()
                    fl.append('file', files[0])
                    const data = await funUpload(fl, user)
                    if (!data) return Notify.failure("gagal")
                    Notify.success("success")
                    return router.back()
                }}
                onReject={(files) => Notify.warning("kegedean atau file gak support")}
                maxSize={3 * 1024 ** 2}
                // accept={IMAGE_MIME_TYPE}
            >
                <Group position="center" mih={220} style={{ pointerEvents: 'none' }}>
                    <Dropzone.Accept>
                        <IconUpload
                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                            stroke={1.5}
                        />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <IconX
                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                            stroke={1.5}
                        />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        <IconPhoto
                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                            stroke={1.5}
                        />
                    </Dropzone.Idle>

                    <div>
                        <Text size="xl" inline>
                            Drag images here or click to select files
                        </Text>
                        <Text size="sm" c="dimmed" inline mt={7}>
                            Attach as many files as you like, each file should not exceed 5mb
                        </Text>
                    </div>
                </Group>
            </Dropzone>
        </Stack>
    );
}