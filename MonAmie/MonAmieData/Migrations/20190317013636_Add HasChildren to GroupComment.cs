using Microsoft.EntityFrameworkCore.Migrations;

namespace MonAmieData.Migrations
{
    public partial class AddHasChildrentoGroupComment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "ParentId",
                table: "GroupComment",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<bool>(
                name: "HasChildren",
                table: "GroupComment",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HasChildren",
                table: "GroupComment");

            migrationBuilder.AlterColumn<int>(
                name: "ParentId",
                table: "GroupComment",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}
