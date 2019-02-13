using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MonAmieData.Migrations
{
    public partial class TweakstoForeignKeys : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserHasFriend",
                columns: table => new
                {
                    UserHasFriendId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(nullable: false),
                    FriendId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserHasFriend", x => x.UserHasFriendId);
                    table.ForeignKey(
                        name: "FK_UserHasFriend_User_FriendId",
                        column: x => x.FriendId,
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserHasFriend_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserHasFriendRequest",
                columns: table => new
                {
                    UserHasFriendRequestId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(nullable: false),
                    PendingFriendId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserHasFriendRequest", x => x.UserHasFriendRequestId);
                    table.ForeignKey(
                        name: "FK_UserHasFriendRequest_User_PendingFriendId",
                        column: x => x.PendingFriendId,
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserHasFriendRequest_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserMessage",
                columns: table => new
                {
                    UserMessageId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Content = table.Column<string>(type: "varchar(MAX)", nullable: false),
                    MessageSenderId = table.Column<int>(nullable: false),
                    MessageRecipientId = table.Column<int>(nullable: false),
                    SentDate = table.Column<DateTime>(type: "smalldatetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserMessage", x => x.UserMessageId);
                    table.ForeignKey(
                        name: "FK_UserMessage_User_MessageRecipientId",
                        column: x => x.MessageRecipientId,
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserMessage_User_MessageSenderId",
                        column: x => x.MessageSenderId,
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserHasFriend_FriendId",
                table: "UserHasFriend",
                column: "FriendId");

            migrationBuilder.CreateIndex(
                name: "IX_UserHasFriend_UserId",
                table: "UserHasFriend",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserHasFriendRequest_PendingFriendId",
                table: "UserHasFriendRequest",
                column: "PendingFriendId");

            migrationBuilder.CreateIndex(
                name: "IX_UserHasFriendRequest_UserId",
                table: "UserHasFriendRequest",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserMessage_MessageRecipientId",
                table: "UserMessage",
                column: "MessageRecipientId");

            migrationBuilder.CreateIndex(
                name: "IX_UserMessage_MessageSenderId",
                table: "UserMessage",
                column: "MessageSenderId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserHasFriend");

            migrationBuilder.DropTable(
                name: "UserHasFriendRequest");

            migrationBuilder.DropTable(
                name: "UserMessage");
        }
    }
}
