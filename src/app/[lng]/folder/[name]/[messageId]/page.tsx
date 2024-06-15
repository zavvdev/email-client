export default function MessagePage({
  params,
}: {
  params: { messageId: string };
}) {
  return <div>Message {params.messageId}</div>;
}
