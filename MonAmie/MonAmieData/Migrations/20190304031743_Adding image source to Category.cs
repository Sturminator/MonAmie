using Microsoft.EntityFrameworkCore.Migrations;

namespace MonAmieData.Migrations
{
    public partial class AddingimagesourcetoCategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageSource",
                table: "Category",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageSource",
                table: "Category");
        }
    }
}
