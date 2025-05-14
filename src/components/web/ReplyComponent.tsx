import { useReplies } from '../../hooks/useReply';

const ReplyList = () => {
    const { replies, loading, error } = useReplies();

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur lors du chargement des utilisateurs</div>;

    return (
        <div className="grid gap-4">
            {replies.length > 0 ? (
                replies.map((reply) => (
                    <div key={reply.id_user} className="p-4 shadow rounded bg-white">
                        <p>{reply.id_question}</p>
                        <p>Rôle : {reply.score}</p>
                    </div>
                ))
            ) : (
                <div>Aucun utilisateur trouvé</div>
            )}
        </div>
    );
};

export default ReplyList;
