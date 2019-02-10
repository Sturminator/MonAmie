using Microsoft.EntityFrameworkCore.Migrations;

namespace MonAmieData.Migrations
{
    public partial class UserMessagetweaks : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserMessage_MessageRecipient_MessageRecipientId",
                table: "UserMessage");

            migrationBuilder.DropForeignKey(
                name: "FK_UserMessage_MessageSender_MessageSenderId",
                table: "UserMessage");

            migrationBuilder.AddForeignKey(
                name: "FK_UserMessage_User_MessageRecipientId",
                table: "UserMessage",
                column: "MessageRecipientId",
                principalTable: "User",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserMessage_User_MessageSenderId",
                table: "UserMessage",
                column: "MessageSenderId",
                principalTable: "User",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserMessage_User_MessageRecipientId",
                table: "UserMessage");

            migrationBuilder.DropForeignKey(
                name: "FK_UserMessage_User_MessageSenderId",
                table: "UserMessage");

            migrationBuilder.AddForeignKey(
                name: "FK_UserMessage_MessageRecipient_MessageRecipientId",
                table: "UserMessage",
                column: "MessageRecipientId",
                principalTable: "MessageRecipient",
                principalColumn: "MessageRecipientId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserMessage_MessageSender_MessageSenderId",
                table: "UserMessage",
                column: "MessageSenderId",
                principalTable: "MessageSender",
                principalColumn: "MessageSenderId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
