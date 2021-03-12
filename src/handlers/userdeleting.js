const deleteUser = async(ctx, cli_id) => {
    await ctx.db.Relation.deleteMany({ host_id: cli_id })
    await ctx.db.Relation.deleteMany({ cli_id: cli_id })
    await ctx.db.Profile.deleteOne({ chat_id: cli_id })
    await ctx.db.User.deleteOne({ chat_id: cli_id })

    console.log(`${cli_id} was deleted from DB, bye bye`)
}

module.exports = deleteUser