using Microsoft.EntityFrameworkCore.Migrations;

namespace MonAmieData.Migrations
{
    public partial class AddUserHasFriendRequestTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserHasFriendRequest",
                columns: table => new
                {
                    UserHasFriendRequestId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    PendingFriendId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserHasFriendRequest", x => new { x.UserId, x.PendingFriendId });
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

            migrationBuilder.CreateIndex(
                name: "IX_UserHasFriendRequest_PendingFriendId",
                table: "UserHasFriendRequest",
                column: "PendingFriendId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserHasFriendRequest");
        }
    }
}
