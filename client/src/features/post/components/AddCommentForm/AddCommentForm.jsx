export default function AddCommentForm() {
  return (
    <form className="w-full flex px-4 py-3">
      <input
        type="text"
        className="grow max-w-full outline-none text-sm"
        name="commentInput"
        id="commentInput"
        placeholder="Add comment..."
        required
      />
      <button className="grow-0 shrink max-w-max text-sm text-mainGreen">
        Comment
      </button>
    </form>
  );
}
