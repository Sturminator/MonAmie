using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MonAmieData.Migrations
{
    public partial class AddedUserMessageMessageRecipientMessageSenderTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MessageRecipient",
                columns: table => new
                {
                    MessageRecipientId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MessageRecipient", x => x.MessageRecipientId);
                    table.ForeignKey(
                        name: "FK_MessageRecipient_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MessageSender",
                columns: table => new
                {
                    MessageSenderId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MessageSender", x => x.MessageSenderId);
                    table.ForeignKey(
                        name: "FK_MessageSender_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserMessage",
                columns: table => new
                {
                    UserMessageId = table.Column<int>(nullable: false),
                    Content = table.Column<string>(type: "varchar(MAX)", nullable: false),
                    MessageSenderId = table.Column<int>(nullable: false),
                    MessageRecipientId = table.Column<int>(nullable: false),
                    SentDate = table.Column<DateTime>(type: "smalldatetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserMessage", x => new { x.MessageSenderId, x.MessageRecipientId });
                    table.ForeignKey(
                        name: "FK_UserMessage_MessageRecipient_MessageRecipientId",
                        column: x => x.MessageRecipientId,
                        principalTable: "MessageRecipient",
                        principalColumn: "MessageRecipientId",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_UserMessage_MessageSender_MessageSenderId",
                        column: x => x.MessageSenderId,
                        principalTable: "MessageSender",
                        principalColumn: "MessageSenderId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MessageRecipient_UserId",
                table: "MessageRecipient",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_MessageSender_UserId",
                table: "MessageSender",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserMessage_MessageRecipientId",
                table: "UserMessage",
                column: "MessageRecipientId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserMessage");

            migrationBuilder.DropTable(
                name: "MessageRecipient");

            migrationBuilder.DropTable(
                name: "MessageSender");
        }
    }
}
