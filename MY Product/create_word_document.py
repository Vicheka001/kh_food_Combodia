import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import qn, nsdecls
import os

FONT_LATIN = "Times New Roman"
FONT_KHMER = "Khmer OS Siemreap"

def create_ict_morning_guide():
    doc = docx.Document()

    # Configure Normal Style defaults
    style_normal = doc.styles['Normal']
    style_normal.font.name = FONT_LATIN
    style_normal.font.size = Pt(11)
    rPr_normal = style_normal.element.get_or_add_rPr()
    rFonts_normal = OxmlElement('w:rFonts')
    rFonts_normal.set(qn('w:ascii'), FONT_LATIN)
    rFonts_normal.set(qn('w:hAnsi'), FONT_LATIN)
    rFonts_normal.set(qn('w:cs'), FONT_KHMER)
    rPr_normal.append(rFonts_normal)

    # Helper function to format run with Khmer and Latin fonts
    def format_run(run, font_khmer=FONT_KHMER, font_latin=FONT_LATIN, size_pt=11, bold=False, italic=False, color_rgb=None):
        run.font.name = font_latin
        run.font.size = Pt(size_pt)
        run.bold = bold
        run.italic = italic
        if color_rgb:
            run.font.color.rgb = color_rgb
        rPr = run._r.get_or_add_rPr()
        rFonts = OxmlElement('w:rFonts')
        rFonts.set(qn('w:ascii'), font_latin)
        rFonts.set(qn('w:hAnsi'), font_latin)
        rFonts.set(qn('w:cs'), font_khmer)
        rPr.append(rFonts)

    def set_cell_background(cell, hex_color):
        shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{hex_color}"/>')
        cell._tc.get_or_add_tcPr().append(shd)

    def set_cell_margins(cell, top=120, bottom=120, left=160, right=160):
        tcPr = cell._tc.get_or_add_tcPr()
        tcMar = OxmlElement('w:tcMar')
        for side, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
            node = OxmlElement(f'w:{side}')
            node.set(qn('w:w'), str(val))
            node.set(qn('w:type'), 'dxa')
            tcMar.append(node)
        tcPr.append(tcMar)

    def set_table_borders(table, color="CBD5E1", sz="4", val="single"):
        tblPr = table._tbl.tblPr
        tblBorders = parse_xml(
            f'<w:tblBorders {nsdecls("w")}>'
            f'<w:top w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>'
            f'<w:bottom w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>'
            f'<w:insideH w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>'
            f'<w:insideV w:val="none"/>'
            f'<w:left w:val="none"/>'
            f'<w:right w:val="none"/>'
            f'</w:tblBorders>'
        )
        tblPr.append(tblBorders)

    # 1. Page Margins Setup
    sections = doc.sections
    for section in sections:
        section.top_margin = Inches(0.8)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(0.9)
        section.right_margin = Inches(0.9)
        section.different_first_page_header_footer = False
        
        # Header & Footer
        header = section.header
        hp = header.paragraphs[0]
        hp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        hrun = hp.add_run("ផែនការសកម្មភាពបង្រៀនប្រចាំថ្ងៃ — មុខវិជ្ជា ICT | ថ្នាក់ពេលព្រឹក")
        format_run(hrun, font_khmer=FONT_KHMER, font_latin=FONT_LATIN, size_pt=9, color_rgb=RGBColor(148, 163, 184))

        footer = section.footer
        fp = footer.paragraphs[0]
        fp.alignment = WD_ALIGN_PARAGRAPH.CENTER
        frun = fp.add_run("រៀបចំសម្រាប់គ្រូបង្រៀនព័ត៌មានវិទ្យា (ICT Instructor Daily Guide) • ទំព័រ ")
        format_run(frun, font_khmer=FONT_KHMER, font_latin=FONT_LATIN, size_pt=9, color_rgb=RGBColor(148, 163, 184))
        
        # Add page number to footer
        f_xml = parse_xml(r'<w:fldSimple %s w:instr="PAGE"/>' % nsdecls('w'))
        fp._p.append(f_xml)

    def add_custom_heading(text, level=1, space_before=14, space_after=6):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(space_before)
        p.paragraph_format.space_after = Pt(space_after)
        p.paragraph_format.line_spacing = 1.2
        
        if level == 1:
            run = p.add_run(text)
            format_run(run, font_khmer=FONT_KHMER, font_latin=FONT_LATIN, size_pt=14, bold=True, color_rgb=RGBColor(30, 58, 138)) # Navy #1E3A8A
            # Add bottom border under heading 1
            pPr = p._p.get_or_add_pPr()
            pBdr = parse_xml(f'<w:pBdr {nsdecls("w")}><w:bottom w:val="single" w:sz="12" w:space="4" w:color="3B82F6"/></w:pBdr>')
            pPr.append(pBdr)
        elif level == 2:
            run = p.add_run(text)
            format_run(run, font_khmer=FONT_KHMER, font_latin=FONT_LATIN, size_pt=12.5, bold=True, color_rgb=RGBColor(37, 99, 235)) # Blue #2563EB
        elif level == 3:
            run = p.add_run(text)
            format_run(run, font_khmer=FONT_KHMER, font_latin=FONT_LATIN, size_pt=11.5, bold=True, color_rgb=RGBColor(15, 23, 42)) # Slate #0F172A
        return p

    def add_callout(title, items, border_color="3B82F6", bg_color="EFF6FF"):
        tbl = doc.add_table(rows=1, cols=1)
        tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
        tbl.autofit = False
        tbl.columns[0].width = Inches(6.7)
        cell = tbl.cell(0, 0)
        set_cell_background(cell, bg_color)
        set_cell_margins(cell, top=140, bottom=140, left=180, right=180)
        
        tcPr = cell._tc.get_or_add_tcPr()
        tcBorders = parse_xml(
            f'<w:tcBorders {nsdecls("w")}>'
            f'<w:top w:val="none"/>'
            f'<w:left w:val="single" w:sz="24" w:space="0" w:color="{border_color}"/>'
            f'<w:bottom w:val="none"/>'
            f'<w:right w:val="none"/>'
            f'</w:tcBorders>'
        )
        tcPr.append(tcBorders)

        p = cell.paragraphs[0]
        p.paragraph_format.space_before = Pt(2)
        p.paragraph_format.space_after = Pt(4)
        run_title = p.add_run(title)
        format_run(run_title, font_khmer=FONT_KHMER, font_latin=FONT_LATIN, size_pt=11, bold=True, color_rgb=RGBColor(30, 58, 138))
        
        for item in items:
            pi = cell.add_paragraph()
            pi.paragraph_format.space_before = Pt(2)
            pi.paragraph_format.space_after = Pt(2)
            pi.paragraph_format.left_indent = Inches(0.2)
            run_bullet = pi.add_run("• ")
            format_run(run_bullet, font_khmer=FONT_KHMER, font_latin=FONT_LATIN, size_pt=10.5, color_rgb=RGBColor(37, 99, 235))
            run_txt = pi.add_run(item)
            format_run(run_txt, font_khmer=FONT_KHMER, font_latin=FONT_LATIN, size_pt=10.5, color_rgb=RGBColor(51, 65, 85))
        
        doc.add_paragraph().paragraph_format.space_after = Pt(4)

    # ------------------ DOCUMENT HEADER & BANNER ------------------
    title_tbl = doc.add_table(rows=1, cols=1)
    title_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    title_tbl.autofit = False
    title_tbl.columns[0].width = Inches(6.7)
    title_cell = title_tbl.cell(0, 0)
    set_cell_background(title_cell, "1E3A8A") # Navy Blue
    set_cell_margins(title_cell, top=200, bottom=200, left=220, right=220)

    tp1 = title_cell.paragraphs[0]
    tp1.alignment = WD_ALIGN_PARAGRAPH.CENTER
    tp1.paragraph_format.space_after = Pt(4)
    run_t1 = tp1.add_run("ផែនការសកម្មភាព និងកាលវិភាគបង្រៀនសិស្ស ICT (ពេលព្រឹក)")
    format_run(run_t1, font_khmer=FONT_KHMER, font_latin=FONT_LATIN, size_pt=15, bold=True, color_rgb=RGBColor(255, 255, 255))

    tp2 = title_cell.add_paragraph()
    tp2.alignment = WD_ALIGN_PARAGRAPH.CENTER
    tp2.paragraph_format.space_after = Pt(0)
    run_t2 = tp2.add_run("MORNING ACTION PLAN & TIMELINE FOR ICT INSTRUCTOR")
    format_run(run_t2, font_khmer=FONT_KHMER, font_latin=FONT_LATIN, size_pt=10.5, bold=True, color_rgb=RGBColor(191, 219, 254))

    # Meta Info Cards Table (4 columns)
    meta_tbl = doc.add_table(rows=1, cols=4)
    meta_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    meta_tbl.autofit = False
    col_widths = [Inches(1.6), Inches(1.7), Inches(1.7), Inches(1.7)]
    for i, w in enumerate(col_widths):
        meta_tbl.columns[i].width = w

    meta_data = [
        ("កាលបរិច្ឆេទ (Date)", "ព្រឹកថ្ងៃនេះ (Today)"),
        ("មុខវិជ្ជា (Subject)", "ព័ត៌មានវិទ្យា (ICT)"),
        ("ពេលវេលា (Duration)", "៧:០០ ព្រឹក - ១១:៣០ ព្រឹក"),
        ("ទីតាំង (Location)", "បន្ទប់កុំព្យូទ័រ (Computer Lab)")
    ]

    for i, (label, val) in enumerate(meta_data):
        c = meta_tbl.cell(0, i)
        set_cell_background(c, "F1F5F9")
        set_cell_margins(c, top=80, bottom=80, left=100, right=100)
        p = c.paragraphs[0]
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(1)
        r_lbl = p.add_run(label + "\n")
        format_run(r_lbl, font_khmer=FONT_KHMER, font_latin=FONT_LATIN, size_pt=9, bold=False, color_rgb=RGBColor(100, 116, 139))
        r_val = p.add_run(val)
        format_run(r_val, font_khmer=FONT_KHMER, font_latin=FONT_LATIN, size_pt=10.5, bold=True, color_rgb=RGBColor(15, 23, 42))

    set_table_borders(meta_tbl, color="E2E8F0", sz="4", val="single")

    p_intro = doc.add_paragraph()
    p_intro.paragraph_format.space_before = Pt(10)
    p_intro.paragraph_format.space_after = Pt(8)
    p_intro.paragraph_format.line_spacing = 1.25
    r_intro = p_intro.add_run(
        "ឯកសារនេះត្រូវបានរៀបចំឡើងជាពិសេសសម្រាប់ជាមគ្គុទ្ទេសក៍ជាក់ស្ដែងដល់លោកគ្រូ/អ្នកគ្រូ ក្នុងការដឹកនាំ និងបង្រៀនសិស្សក្នុងបន្ទប់កុំព្យូទ័រ (ICT Lab) នាព្រឹកថ្ងៃនេះ។ "
        "គោលបំណងចម្បងគឺដើម្បីធានាឱ្យដំណើរការបង្រៀនប្រព្រឹត្តទៅដោយរលូន គ្រប់គ្រងពេលវេលាបានល្អ សិស្សទទួលបានការអនុវត្តផ្ទាល់ដៃយ៉ាងហោចណាស់ ៧០-៨០% និងកាត់បន្ថយបញ្ហារអាក់រអួលបច្ចេកទេសក្នុងថ្នាក់។"
    )
    format_run(r_intro, font_khmer=FONT_KHMER, font_latin=FONT_LATIN, size_pt=11, color_rgb=RGBColor(51, 65, 85))

    # ------------------ SECTION 1: MASTER TIMELINE TABLE ------------------
    add_custom_heading("ផ្នែកទី ១៖ តារាងកាលវិភាគសកម្មភាពលម្អិតប្រចាំព្រឹក (Master Timeline)", level=1, space_before=12)

    sched_tbl = doc.add_table(rows=8, cols=4)
    sched_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    sched_tbl.autofit = False
    
    col_w = [Inches(1.2), Inches(1.8), Inches(2.6), Inches(1.1)]
    for i, w in enumerate(col_w):
        sched_tbl.columns[i].width = w

    headers = ["ពេលវេលា", "ដំណាក់កាល", "សកម្មភាពសំខាន់ៗដែលត្រូវធ្វើ", "វិធីសាស្ត្រ/ឧបករណ៍"]
    for col_idx, h_text in enumerate(headers):
        cell = sched_tbl.cell(0, col_idx)
        set_cell_background(cell, "1E3A8A")
        set_cell_margins(cell, top=120, bottom=120, left=100, right=100)
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(0)
        run = p.add_run(h_text)
        format_run(run, font_khmer=FONT_KHMER, font_latin=FONT_LATIN, size_pt=10.5, bold=True, color_rgb=RGBColor(255, 255, 255))

    timeline_rows = [
        ("០៧:០០ - ០៧:៣០", "១. ត្រួតពិនិត្យបច្ចេកទេស\n(Tech Setup)", "• បើក Router, Wi-Fi & Switch ពិនិត្យល្បឿន Internet\n• បើក Projector & កុំព្យូទ័រគ្រូ និងសិស្ស\n• ត្រៀម Slide, កូដគំរូ និង File លំហាត់ Lab Sheet\n• ពិនិត្យសុវត្ថិភាពខ្សែភ្លើង និងម៉ាស៊ីនត្រជាក់", "Speedtest, NetSupport / Veyon, Google Drive"),
        ("០៧:៣០ - ០៨:០០", "២. ស្វាគមន៍ & បំផុសស្មារតី\n(Warm-up & Attendance)", "• ស្វាគមន៍សិស្ស និងស្រង់វត្តមានឱ្យបានច្បាស់លាស់\n• ចែករំលែក Tech News / AI ថ្មីៗ (៥-១០ នាទី)\n• Quick Quiz រំលឹកមេរៀនពីម្សិលមិញ\n• ប្រកាសគោលដៅសិក្សាច្បាស់លាស់សម្រាប់ថ្ងៃនេះ", "Kahoot / Quizizz / Flashcard, Telegram Group"),
        ("០៨:០០ - ០៩:០០", "៣. បង្រៀនទ្រឹស្តី & បង្ហាញគំរូ\n(Micro-Lecture & Demo)", "• បង្រៀនទ្រឹស្តីខ្លីងាយយល់ (១៥-២០ នាទី)\n• Live Demonstration / Live Coding បង្ហាញមួយជំហានម្តងៗ\n• បង្ហាញ Common Errors និងរបៀប Debug\n• សួរដេញដោលស្ទាបស្ទង់ការយល់ដឹងរបស់សិស្ស", "Projector, IDE / VS Code / Office, Miro / Canva"),
        ("០៩:០០ - ០៩:១៥", "៤. សម្រាកសម្រួលរាងកាយ\n(Eye & Ergonomics Break)", "• អនុវត្តក្បួន 20-20-20 សម្រាកភ្នែកពីកញ្ចក់កុំព្យូទ័រ\n• ឱ្យសិស្សក្រោកឈរ ពត់ខ្លួន សម្រួលសរសៃក និងខ្នង\n• ផឹកទឹក និងចេញទៅស្រូបខ្យល់អាកាសក្រៅបន្ទប់", "Ergonomics Rule (20-20-20)"),
        ("០៩:១៥ - ១០:៣០", "៥. សិស្សអនុវត្តផ្ទាល់ដៃ\n(Hands-on Lab Practice)", "• ដាក់លំហាត់អនុវត្តបែងចែកជា ៣ កម្រិត (Basic/Med/Adv)\n• គ្រូចុះដើរត្រួតពិនិត្យ និងជួយដោះស្រាយ Error ផ្ទាល់តុ\n• មិនវាយកូដជំនួសសិស្ស (សួរសំណួរនាំផ្លូវឱ្យសិស្សរកឃើញ)\n• ជំរុញសិស្សពូកែឱ្យជួយមិត្តភក្តិ (Peer-learning)", "Lab Exercises, GitHub / Shared Folder"),
        ("១០:៣០ - ១១:០០", "៦. បង្ហាញស្នាដៃ & សំណួរ\n(Showcase & Review)", "• ហៅសិស្ស ២-៣ នាក់ឡើងបង្ហាញស្នាដៃលើ Projector\n• ផ្ដល់ Feedback និងកោតសរសើរការខិតខំប្រឹងប្រែង\n• សង្ខេបបញ្ហា/កំហុសដែលសិស្សជួបប្រទះច្រើនជាងគេ\n• បើកវេទិកាសំណួរ-ចម្លើយ (Q&A)", "Live Project Showcase, Whiteboard discussion"),
        ("១១:០០ - ១១:៣០", "៧. បូកសរុប & បិទបន្ទប់ Lab\n(Wrap-up & Housekeeping)", "• សង្ខេប ៣ ចំណុចគន្លឹះសំខាន់នៃមេរៀនថ្ងៃនេះ\n• ដាក់កិច្ចការស្រាវជ្រាវបន្ថែម ឬ Homework\n• ណែនាំសិស្ស Backup & Save ឯកសារឡើង Cloud\n• Shutdown កុំព្យូទ័រ រៀបចំកៅអី បិទភ្លើង និងម៉ាស៊ីនត្រជាក់", "Cloud Drive, Google Classroom, Daily Checklist")
    ]

    for row_idx, data in enumerate(timeline_rows):
        bg = "FFFFFF" if row_idx % 2 == 0 else "F8FAFC"
        for col_idx, text in enumerate(data):
            cell = sched_tbl.cell(row_idx + 1, col_idx)
            set_cell_background(cell, bg)
            set_cell_margins(cell, top=100, bottom=100, left=90, right=90)
            p = cell.paragraphs[0]
            p.paragraph_format.space_before = Pt(0)
            p.paragraph_format.space_after = Pt(0)
            p.paragraph_format.line_spacing = 1.15
            
            if col_idx == 0:
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER
                run = p.add_run(text)
                format_run(run, font_khmer=FONT_KHMER, font_latin=FONT_LATIN, size_pt=10, bold=True, color_rgb=RGBColor(30, 58, 138))
            elif col_idx == 1:
                run = p.add_run(text)
                format_run(run, font_khmer=FONT_KHMER, font_latin=FONT_LATIN, size_pt=10, bold=True, color_rgb=RGBColor(15, 23, 42))
            elif col_idx == 2:
                run = p.add_run(text)
                format_run(run, font_khmer=FONT_KHMER, font_latin=FONT_LATIN, size_pt=10, bold=False, color_rgb=RGBColor(51, 65, 85))
            else:
                p.alignment = WD_ALIGN_PARAGRAPH.LEFT
                run = p.add_run(text)
                format_run(run, font_khmer=FONT_KHMER, font_latin=FONT_LATIN, size_pt=9.5, italic=True, color_rgb=RGBColor(100, 116, 139))

    set_table_borders(sched_tbl, color="CBD5E1", sz="4", val="single")

    # ------------------ SECTION 2: DETAILED STEP-BY-STEP INSTRUCTIONS ------------------
    add_custom_heading("ផ្នែកទី ២៖ ការណែនាំអនុវត្តលម្អិតតាមដំណាក់កាលនីមួយៗ", level=1, space_before=16)

    # Step 1
    add_custom_heading("១. មុនពេលសិស្សចូលរៀន (ម៉ោង ០៧:០០ - ០៧:៣០ ព្រឹក) ៖ ការរៀបចំបច្ចេកទេស", level=2, space_before=10)
    p_s1 = doc.add_paragraph()
    p_s1.paragraph_format.line_spacing = 1.25
    p_s1.paragraph_format.space_after = Pt(4)
    r = p_s1.add_run(
        "ភាពជោគជ័យនៃថ្នាក់ ICT អាស្រ័យយ៉ាងខ្លាំងលើការត្រៀមទុកជាមុន។ បញ្ហាបច្ចេកទេសតូចមួយអាចធ្វើឱ្យខាតពេលវេលារៀនរាប់សិបនាទី។ អ្វីដែលអ្នកត្រូវធ្វើរួមមាន៖\n"
        "• ត្រួតពិនិត្យបណ្ដាញ Internet & Wi-Fi៖ ធ្វើតេស្តល្បឿន និងពិនិត្យថាគ្រប់ម៉ាស៊ីនអាចចូលទៅកាន់ Website ឬ Resources ដែលត្រូវប្រើក្នុងមេរៀនបានដោយគ្មានបញ្ហារាំងខ្ទប់ (Firewall/Proxy)។\n"
        "• ត្រួតពិនិត្យ Software & Tools៖ បើកកម្មវិធីដែលត្រូវរៀន (ឧ. VS Code, Python, Node.js, MS Office, Figma, XAMPP...) លើម៉ាស៊ីនគ្រូ និងម៉ាស៊ីនសិស្សមួយចំនួន ដើម្បីប្រាកដថាដំណើរការប្រក្រតី មិនជាប់ Update យឺតយ៉ាវ។\n"
        "• បញ្ជូនឯកសារមេរៀនទុកជាមុន៖ ដាក់ឯកសារ Slides, Starter Code, ឬរូបភាពគំរូ ទៅក្នុង Telegram Group ឬ Google Drive រួចជាស្រេច ដើម្បីពេលសិស្សមកដល់ អាច Download ភ្លាមៗ។\n"
        "• រៀបចំបរិស្ថានបន្ទប់៖ បើកម៉ាស៊ីនត្រជាក់ឱ្យត្រជាក់ល្មម ពិនិត្យកម្រាល និងខ្សែភ្លើងកុំឱ្យរដិបរដុបងាយជំពប់ជើង។"
    )
    format_run(r, font_khmer=FONT_KHMER, font_latin=FONT_LATIN, size_pt=10.5, color_rgb=RGBColor(51, 65, 85))

    add_callout(
        "💡 គន្លឹះការពារបញ្ហាបច្ចេកទេស (Tech Pro-Tip):",
        [
            "តែងតែមានផែនការបម្រុង (Backup Plan) ជានិច្ច ឧទាហរណ៍៖ ប្រសិនបើដាច់ Internet តើមានលំហាត់ Offline អ្វីខ្លះសម្រាប់សិស្ស?",
            "ចម្លង Starter Files ទុកក្នុង USB Flash Drive មួយផង ក្រែងលោសិស្សណាមានបញ្ហាមិនអាច Download តាម Network បាន។"
        ],
        border_color="2563EB", bg_color="EFF6FF"
    )

    # Step 2
    add_custom_heading("២. ពេលចាប់ផ្ដើមថ្នាក់ (ម៉ោង ០៧:៣០ - ០៨:០០ ព្រឹក) ៖ វត្តមាន និងការបំផុសស្មារតី", level=2, space_before=10)
    p_s2 = doc.add_paragraph()
    p_s2.paragraph_format.line_spacing = 1.25
    p_s2.paragraph_format.space_after = Pt(4)
    r = p_s2.add_run(
        "• ស្វាគមន៍ដោយភាពកក់ក្ដៅ និងស្រង់វត្តមាន៖ ស្វាគមន៍សិស្សពេលពួកគេដើរចូលបន្ទប់។ ស្រង់វត្តមានឱ្យបានម៉ឺងម៉ាត់ ប៉ុន្តែក្នុងបរិយាកាសស្និទ្ធស្នាល។ សង្កេតមើលថាតើសិស្សណាមានទឹកមុខស្រងូតស្រងាត់ ឬងងុយគេង ដើម្បីត្រៀមដាស់ស្មារតី។\n"
        "• សកម្មភាពបំផុសស្មារតី (Morning Icebreaker / Tech News - ៥ ទៅ ១០ នាទី)៖ ចែករំលែករឿងរ៉ាវបច្ចេកវិទ្យាថ្មីៗដែលគួរឱ្យចាប់អារម្មណ៍ ដូចជាការអភិវឌ្ឍ AI ថ្មីៗ, ករណី Cybersecurity ធំៗដែលទើបកើតឡើង ឬ Shortcut ងាយៗដែលជួយបង្កើនល្បឿនការងារ។\n"
        "• សំណួររំលឹកមេរៀន (Flash Quiz - ៥ នាទី)៖ សួរសំណួរខ្លីៗ ២-៣ ទាក់ទងនឹងមេរៀនកាលពីថ្ងៃមុន ដូចជា «តើកាលពីម្សិលមិញយើងរៀនពី Function អ្វី?» ឬ «ហេតុអ្វីបានជាត្រូវប្រើ Git Branch?» ដើម្បីភ្ញោចខួរក្បាលសិស្សឱ្យភ្ជាប់មកមេរៀនថ្ងៃនេះ។\n"
        "• កំណត់គោលដៅសិក្សាប្រចាំថ្ងៃ (Daily Learning Objective)៖ ប្រាប់សិស្សឱ្យបានច្បាស់លាស់ពីលទ្ធផលរំពឹងទុក ឧទាហរណ៍៖ «នៅម៉ោង ១១:០០ ថ្ងៃនេះ អ្នកទាំងអស់គ្នានឹងអាច Build បាន Landing Page មួយដែលមាន Responsive Design ដោយខ្លួនឯង!»។"
    )
    format_run(r, font_khmer=FONT_KHMER, font_latin=FONT_LATIN, size_pt=10.5, color_rgb=RGBColor(51, 65, 85))

    # Step 3
    add_custom_heading("៣. ការបង្រៀនទ្រឹស្តី និងបង្ហាញការអនុវត្ត (ម៉ោង ០៨:០០ - ០៩:០០ ព្រឹក) ៖ \"I DO\"", level=2, space_before=10)
    p_s3 = doc.add_paragraph()
    p_s3.paragraph_format.line_spacing = 1.25
    p_s3.paragraph_format.space_after = Pt(4)
    r = p_s3.add_run(
        "• ក្បួន Micro-Lecture (១៥ ទៅ ២០ នាទី)៖ ក្នុងវិស័យ ICT ការនិយាយទ្រឹស្តីច្រើនពេកនឹងធ្វើឱ្យសិស្សងងុយគេង និងបាត់បង់ការផ្តោតអារម្មណ៍។ និយាយតែគោលការណ៍គន្លឹះ (Core Concept) រួចភ្ជាប់ទៅនឹងឧទាហរណ៍ជាក់ស្ដែងភ្លាមៗ។\n"
        "• ការបង្ហាញផ្ទាល់ភ្នែក (Live Demonstration / Live Coding - ៣០ នាទី)៖\n"
        "    - បើក Projector ឬ Share Screen ទៅកុំព្យូទ័រសិស្ស។\n"
        "    - វាយកូដ ឬអនុវត្តមួយជំហានម្តងៗដោយយឺតៗ និងពន្យល់ពីមូលហេតុដែលយើងធ្វើបែបនោះ (Why, not just How)។\n"
        "    - បង្កើនទំហំពុម្ពអក្សរ (Font Size) លើអេក្រង់កូដឱ្យធំច្បាស់ ដើម្បីឱ្យសិស្សអង្គុយក្រោយមើលឃើញងាយស្រួល។\n"
        "• ធ្វើកំហុសដោយចេតនា (Intentional Bug / Error Demo)៖ សាកល្បងសរសេរឱ្យមាន Syntax Error ឬកំហុសតក្កវិជ្ជា ដើម្បីបង្ហាញសិស្សពីរបៀបអានសារកំហុស (Error Message) និងជំហានក្នុងការដោះស្រាយ (Troubleshooting/Debugging)។ នេះជាជំនាញដ៏សំខាន់បំផុតសម្រាប់អ្នករៀន IT!"
    )
    format_run(r, font_khmer=FONT_KHMER, font_latin=FONT_LATIN, size_pt=10.5, color_rgb=RGBColor(51, 65, 85))

    # Step 4
    add_custom_heading("៤. សម្រាកខ្លី និងថែទាំសុខភាពភ្នែក (ម៉ោង ០៩:០០ - ០៩:១៥ ព្រឹក) ៖ Break Time", level=2, space_before=10)
    p_s4 = doc.add_paragraph()
    p_s4.paragraph_format.line_spacing = 1.25
    p_s4.paragraph_format.space_after = Pt(4)
    r = p_s4.add_run(
        "ការសម្លឹងមើលកញ្ចក់អេក្រង់កុំព្យូទ័រយូរធ្វើឱ្យខ្សោយភ្នែក និងអស់កម្លាំងខួរក្បាល។ ដូច្នេះការសម្រាក ១៥ នាទីនេះគឺចាំបាច់បំផុត៖\n"
        "• ណែនាំក្បួន ២០-២០-២០ (20-20-20 Rule)៖ ក្រឡេកមើលទៅវត្ថុនៅចម្ងាយ ២០ ហ្វីត (ប្រហែល ៦ ម៉ែត្រ) រយៈពេល ២០ វិនាទី ដើម្បីសម្រួលសាច់ដុំកែវភ្នែក។\n"
        "• លើកទឹកចិត្តឱ្យក្រោកឈរពីកៅអី៖ ធ្វើចលនាពត់ខ្លួន សម្រួលសរសៃក ស្មា និងកដៃ (ដើម្បីការពារជំងឺ Carpal Tunnel Syndrome)។\n"
        "• ណែនាំឱ្យផឹកទឹក និងចេញទៅស្រូបខ្យល់អាកាសធម្មជាតិក្រៅបន្ទប់ម៉ាស៊ីនត្រជាក់។"
    )
    format_run(r, font_khmer=FONT_KHMER, font_latin=FONT_LATIN, size_pt=10.5, color_rgb=RGBColor(51, 65, 85))

    # Step 5
    add_custom_heading("៥. សិស្សអនុវត្តជាក់ស្តែងផ្ទាល់ដៃ (ម៉ោង ០៩:១៥ - ១០:៣០ ព្រឹក) ៖ \"WE DO & YOU DO\"", level=2, space_before=10)
    p_s5 = doc.add_paragraph()
    p_s5.paragraph_format.line_spacing = 1.25
    p_s5.paragraph_format.space_after = Pt(4)
    r = p_s5.add_run(
        "នេះជាពេលវេលាសំខាន់បំផុតនៃថ្នាក់ ICT (រយៈពេល ៧៥ នាទីពេញ)។ ជំនាញកុំព្យូទ័រមិនអាចចេះតាមរយៈការមើលទេ គឺត្រូវអនុវត្តផ្ទាល់ដៃ៖\n"
        "• ចែកលំហាត់ជា ៣ កម្រិត (Differentiated Tasks)៖\n"
        "    - កម្រិត ១ (មូលដ្ឋាន - Basic)៖ អនុវត្តតាមលំនាំគ្រូឱ្យបានពេញលេញ ១០០% (គ្រប់សិស្សទាំងអស់ត្រូវតែធ្វើឱ្យបាន)។\n"
        "    - កម្រិត ២ (មធ្យម - Intermediate)៖ កែប្រែ ឬបន្ថែម Features ថ្មីៗដោយខ្លួនឯង ដោយមិនមើលគំរូ។\n"
        "    - កម្រិត ៣ (កម្រិតខ្ពស់ - Bonus Challenge)៖ លំហាត់ប្រឈមបន្ថែមសម្រាប់សិស្សដែលរៀនលឿន ដើម្បីកុំឱ្យពួកគេទំនេរធុញទ្រាន់។\n"
        "• យុទ្ធសាស្ត្ររបស់គ្រូក្នុងពេលសិស្សអនុវត្ត (Active Facilitation)៖\n"
        "    - ហាមអង្គុយនៅតុគ្រូជាប់! ត្រូវចុះដើរពិនិត្យមើលអេក្រង់សិស្សគ្រប់តុ។\n"
        "    - វិធាន \"មិនប៉ះកណ្ដុរ និងក្ដារចុចរបស់សិស្ស (Hands-off Keyboard Rule)\"៖ ពេលសិស្សសួរ ឬជួប Error កុំលូកដៃទៅវាយជំនួសសិស្ស។ ត្រូវឱ្យសិស្សជាអ្នកចុច និងវាយដោយខ្លួនឯង ដោយគ្រូគ្រាន់តែជាអ្នកចង្អុលបង្ហាញ និងសួរសំណួរនាំផ្លូវ។\n"
        "    - ជំរុញ Peer-to-Peer Learning៖ ប្រសិនបើសិស្សណាធ្វើចប់មុន និងធ្វើបានល្អ សូមលើកទឹកចិត្តឱ្យពួកគេទៅជួយពន្យល់មិត្តភក្តិក្បែរខ្លួនដែលកំពុងជួបការលំបាក។"
    )
    format_run(r, font_khmer=FONT_KHMER, font_latin=FONT_LATIN, size_pt=10.5, color_rgb=RGBColor(51, 65, 85))

    add_callout(
        "⚠️ ច្បាប់មាសពេលជួយសិស្សដោះស្រាយ Bug (Debugging Golden Rule):",
        [
            "កុំប្រាប់ចម្លើយភ្លាមៗ! ចូរប្រើសំណួរ ៣ ជំហាន៖",
            "១. «តើ Error Message លើអេក្រង់សរសេរថាយ៉ាងម៉េច? តើវាប្រាប់ថាកំហុសនៅបន្ទាត់ណា?»",
            "២. «តើអ្នកទើបតែបន្ថែម ឬកែប្រែកូដ/ទិន្នន័យនៅត្រង់ណាខ្លះមុនពេលវាកើតឡើង?»",
            "៣. «តើអ្នកគិតថាយើងគួរពិនិត្យចំណុចណាខ្លះដើម្បីកែវា?»"
        ],
        border_color="D97706", bg_color="FFFBEB"
    )

    # Step 6
    add_custom_heading("៦. ការបង្ហាញស្នាដៃ និងវាយតម្លៃរួមគ្នា (ម៉ោង ១០:៣០ - ១១:០០ ព្រឹក) ៖ Showcase & Review", level=2, space_before=10)
    p_s6 = doc.add_paragraph()
    p_s6.paragraph_format.line_spacing = 1.25
    p_s6.paragraph_format.space_after = Pt(4)
    r = p_s6.add_run(
        "• ការបង្ហាញស្នាដៃសិស្ស (Student Spotlight - ១៥ នាទី)៖\n"
        "    - ជ្រើសរើសសិស្ស ២ ទៅ ៣ នាក់ (សិស្សដែលធ្វើបានល្អ ១ នាក់ និងសិស្សដែលខំដោះស្រាយបញ្ហាបានជោគជ័យ ១-២ នាក់) ឱ្យឡើងបង្ហាញការងាររបស់ខ្លួនលើ Projector។\n"
        "    - ឱ្យសិស្សពន្យល់ពីវិធីដែលខ្លួនបានធ្វើ និងបញ្ហាដែលខ្លួនបានជួបប្រទះព្រមទាំងវិធីដោះស្រាយ។\n"
        "• ការផ្ដល់មតិស្ថាបនា (Constructive Feedback)៖ កោតសរសើរការច្នៃប្រឌិត និងភាពអំណត់របស់សិស្ស ព្រមទាំងផ្តល់យោបល់បន្ថែមដើម្បីកែលម្អកូដ ឬលទ្ធផលឱ្យកាន់តែស្អាត និងមានប្រសិទ្ធភាព (Best Practices & Clean Code)។\n"
        "• សង្ខេបកំហុសទូទៅ (Common Pitfalls - ១០ នាទី)៖ បង្ហាញកំហុស ៣-៤ ដែលសិស្សជួបប្រទះច្រើនជាងគេក្នុងពេលអនុវត្តលើក្តារខៀន ដើម្បីឱ្យសិស្សទាំងអស់បានដឹង និងចៀសវាងនៅពេលក្រោយ។\n"
        "• សំណួរ-ចម្លើយ (Q&A - ៥ នាទី)៖ ឆ្លើយតបនូវរាល់ចម្ងល់ដែលសិស្សនៅមិនទាន់ច្បាស់។"
    )
    format_run(r, font_khmer=FONT_KHMER, font_latin=FONT_LATIN, size_pt=10.5, color_rgb=RGBColor(51, 65, 85))

    # Step 7
    add_custom_heading("៧. ការបូកសរុប និងបិទបន្ទប់កុំព្យូទ័រ (ម៉ោង ១១:០០ - ១១:៣០ ព្រឹក) ៖ Closing & Housekeeping", level=2, space_before=10)
    p_s7 = doc.add_paragraph()
    p_s7.paragraph_format.line_spacing = 1.25
    p_s7.paragraph_format.space_after = Pt(4)
    r = p_s7.add_run(
        "• សង្ខេបចំណុចគន្លឹះសំខាន់ៗ (Key Takeaways - ៥ នាទី)៖ រំលឹកចំណុចសំខាន់ ៣ យ៉ាងដែលសិស្សត្រូវចងចាំពីមេរៀនព្រឹកនេះ។\n"
        "• ដាក់កិច្ចការផ្ទះ ឬប្រធានបទស្រាវជ្រាវ (Assignment & Self-study)៖ ផ្ដល់ Link វីដេអូបន្ថែម ឬកិច្ចការអនុវត្តតូចមួយនៅផ្ទះ ដើម្បីពង្រឹងការចងចាំ។\n"
        "• ការរក្សាទុកទិន្នន័យ (Data Backup Check)៖ ណែនាំសិស្សឱ្យ Save ឯកសារឱ្យបានត្រឹមត្រូវ រួច Upload ឡើង Google Drive / GitHub ឬរក្សាទុកក្នុង Folder ផ្ទាល់ខ្លួន ជៀសវាងការបាត់បង់ឯកសារពេល Restart ម៉ាស៊ីន (ប្រសិនបើ Lab មានប្រើ Deep Freeze)។\n"
        "• ការរៀបចំបន្ទប់ និងសម្អាត (Lab Cleanliness)៖\n"
        "    - ឱ្យសិស្ស Shutdown កុំព្យូទ័រឱ្យបានត្រឹមត្រូវ (ចុច Start -> Shut down មិនត្រូវដកព្រី ឬចុចប៊ូតុង Power បង្ខំនោះទេ)។\n"
        "    - រៀបចំកៅអីរុញចូលក្រោមតុឱ្យមានរបៀប រៀបចំកណ្ដុរ និងក្តារចុចឱ្យត្រង់ជួរ។\n"
        "    - ពិនិត្យមិនឱ្យមានសម្រាម សំបកនំ ឬដបទឹកនៅលើតុកុំព្យូទ័រ។\n"
        "    - ពិនិត្យមើលថាសិស្សមិនភ្លេច Flash Drive ឬសម្ភារផ្ទាល់ខ្លួន។\n"
        "• ការបិទបន្ទប់របស់គ្រូ៖ បិទ Projector, បិទម៉ាស៊ីនត្រជាក់, ពន្លត់ភ្លើង, បិទ Breaker អគ្គិសនី (ប្រសិនបើមាន) និងចាក់សោរបន្ទប់ដោយសុវត្ថិភាព។"
    )
    format_run(r, font_khmer=FONT_KHMER, font_latin=FONT_LATIN, size_pt=10.5, color_rgb=RGBColor(51, 65, 85))

    # ------------------ SECTION 3: TEACHER'S QUICK CHECKLIST ------------------
    add_custom_heading("ផ្នែកទី ៣៖ បញ្ជីត្រួតពិនិត្យរហ័សសម្រាប់គ្រូ (Teacher's Quick Checklist)", level=1, space_before=16)

    chk_tbl = doc.add_table(rows=17, cols=3)
    chk_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    chk_tbl.autofit = False
    
    chk_w = [Inches(0.6), Inches(2.2), Inches(3.9)]
    for i, w in enumerate(chk_w):
        chk_tbl.columns[i].width = w

    chk_headers = ["ស្ថានភាព", "ផ្នែកការងារ", "សកម្មភាពត្រួតពិនិត្យជាក់ស្ដែង"]
    for col_idx, h_text in enumerate(chk_headers):
        cell = chk_tbl.cell(0, col_idx)
        set_cell_background(cell, "1E3A8A")
        set_cell_margins(cell, top=100, bottom=100, left=80, right=80)
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(0)
        run = p.add_run(h_text)
        format_run(run, font_khmer=FONT_KHMER, font_latin=FONT_LATIN, size_pt=10, bold=True, color_rgb=RGBColor(255, 255, 255))

    checklist_items = [
        # Pre-class
        ("☐", "បច្ចេកទេស (មុនចូល)", "បានពិនិត្យប្រព័ន្ធ Wi-Fi / Router និង Internet ដំណើរការល្អ"),
        ("☐", "បច្ចេកទេស (មុនចូល)", "បានបើក និងតេស្ត Projector / Screen Sharing ឃើញច្បាស់ល្អ"),
        ("☐", "បច្ចេកទេស (មុនចូល)", "បានពិនិត្យ Tools / Software ដែលត្រូវរៀនលើ PC គ្រូ និងសិស្ស"),
        ("☐", "ឯកសារ (មុនចូល)", "បានត្រៀម Slide, Starter Code និង Lab Sheet រួចជាស្រេច"),
        ("☐", "បរិស្ថាន (មុនចូល)", "បន្ទប់មានផាសុកភាព (ម៉ាស៊ីនត្រជាក់ ពន្លឺ និងសុវត្ថិភាពខ្សែភ្លើង)"),
        # In-class
        ("☐", "ថ្នាក់រៀន (ពេលចាប់ផ្ដើម)", "បានស្វាគមន៍សិស្ស និងស្រង់វត្តមានយ៉ាងម៉ឺងម៉ាត់"),
        ("☐", "ថ្នាក់រៀន (ពេលចាប់ផ្ដើម)", "បានធ្វើ Icebreaker / Tech News និង Quiz រំលឹកមេរៀនចាស់"),
        ("☐", "ថ្នាក់រៀន (ពេលចាប់ផ្ដើម)", "បានប្រកាសគោលបំណងរៀនសូត្រច្បាស់លាស់សម្រាប់ថ្ងៃនេះ"),
        ("☐", "ការបង្រៀន (ទ្រឹស្តី)", "បង្រៀនទ្រឹស្តីខ្លី (មិនលើសពី ២០ នាទី) ផ្ដោតលើ Core Concepts"),
        ("☐", "ការបង្រៀន (Demo)", "បានធ្វើ Live Demo មួយជំហានម្តងៗ និងបង្ហាញវិធីដោះស្រាយ Error"),
        ("☐", "សុខភាព (សម្រាក)", "បានឱ្យសិស្សសម្រាកភ្នែក (20-20-20 Rule) និងពត់ដៃជើង ១៥ នាទី"),
        ("☐", "ការអនុវត្ត (Lab)", "បានចុះដើរពិនិត្យសិស្សផ្ទាល់តុ និងមិនវាយកូដជំនួសសិស្ស"),
        ("☐", "ការអនុវត្ត (Lab)", "បានលើកទឹកចិត្ត Peer-Learning ឱ្យសិស្សពូកែជួយមិត្តភក្តិ"),
        ("☐", "ការវាយតម្លៃ (Showcase)", "បានឱ្យសិស្ស ២-៣ នាក់ឡើងបង្ហាញស្នាដៃ និងផ្ដល់ Feedback"),
        # Wrap up
        ("☐", "បិទថ្នាក់ (Wrap-up)", "បានសង្ខេបចំណុចសំខាន់ៗ និងដាក់កិច្ចការស្រាវជ្រាវបន្ត"),
        ("☐", "បិទថ្នាក់ (Housekeeping)", "សិស្សបាន Save/Backup files, Shutdown PC, រៀបកៅអី និងបិទបន្ទប់")
    ]

    for row_idx, (chk, cat, desc) in enumerate(checklist_items):
        bg = "FFFFFF" if row_idx % 2 == 0 else "F8FAFC"
        
        c0 = chk_tbl.cell(row_idx + 1, 0)
        set_cell_background(c0, bg)
        set_cell_margins(c0, top=70, bottom=70, left=60, right=60)
        p0 = c0.paragraphs[0]
        p0.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p0.paragraph_format.space_before = Pt(0)
        p0.paragraph_format.space_after = Pt(0)
        r0 = p0.add_run(chk)
        format_run(r0, font_khmer="Segoe UI Symbol", font_latin="Segoe UI Symbol", size_pt=12, bold=True, color_rgb=RGBColor(37, 99, 235))

        c1 = chk_tbl.cell(row_idx + 1, 1)
        set_cell_background(c1, bg)
        set_cell_margins(c1, top=70, bottom=70, left=60, right=60)
        p1 = c1.paragraphs[0]
        p1.paragraph_format.space_before = Pt(0)
        p1.paragraph_format.space_after = Pt(0)
        r1 = p1.add_run(cat)
        format_run(r1, font_khmer=FONT_KHMER, font_latin=FONT_LATIN, size_pt=10, bold=True, color_rgb=RGBColor(30, 58, 138))

        c2 = chk_tbl.cell(row_idx + 1, 2)
        set_cell_background(c2, bg)
        set_cell_margins(c2, top=70, bottom=70, left=60, right=60)
        p2 = c2.paragraphs[0]
        p2.paragraph_format.space_before = Pt(0)
        p2.paragraph_format.space_after = Pt(0)
        r2 = p2.add_run(desc)
        format_run(r2, font_khmer=FONT_KHMER, font_latin=FONT_LATIN, size_pt=10, bold=False, color_rgb=RGBColor(51, 65, 85))

    set_table_borders(chk_tbl, color="CBD5E1", sz="4", val="single")

    # ------------------ SECTION 4: PEDAGOGICAL TIPS FOR ICT TEACHING ------------------
    add_custom_heading("ផ្នែកទី ៤៖ គន្លឹះគរុកោសល្យជោគជ័យសម្រាប់គ្រូបង្រៀន ICT", level=1, space_before=16)

    ped_tips = [
        ("១. ក្បួន ៨០/២០ (The 80/20 Hands-on Rule)", 
         "ក្នុងមុខវិជ្ជាព័ត៌មានវិទ្យា ចំណេះដឹងកើតចេញពីការអនុវត្តផ្ទាល់ដៃ (Muscle memory & Problem-solving)។ កាត់បន្ថយការនិយាយទ្រឹស្តីឱ្យនៅត្រឹម ២០% នៃម៉ោងរៀន ហើយទុកពេល ៨០% ឱ្យសិស្សបានចុច និងអនុវត្តលើកុំព្យូទ័រដោយផ្ទាល់។"),
        
        ("២. វិធីសាស្ត្រ \"I Do, We Do, You Do\"", 
         "• I Do (គ្រូធ្វើឱ្យមើល)៖ គ្រូបង្ហាញជំហានគំរូយ៉ាងច្បាស់លាស់។\n• We Do (ធ្វើជាមួយគ្នា)៖ គ្រូនាំសិស្សធ្វើលំហាត់មួយដំណាលគ្នាដើម្បីឱ្យស៊ាំនឹងដំណើរការ។\n• You Do (សិស្សធ្វើដោយខ្លួនឯង)៖ ទុកឱ្យសិស្សធ្វើលំហាត់ថ្មីស្រដៀងគ្នានោះដោយឯករាជ្យ។"),
        
        ("៣. គ្រប់គ្រងសិស្សរៀនលឿន និងសិស្សរៀនយឺត (Fast vs Slow Learners)", 
         "នៅក្នុងថ្នាក់កុំព្យូទ័រតែងតែមានសិស្សដែលមានល្បឿនខុសគ្នាខ្លាំង៖\n• ចំពោះសិស្សរៀនលឿន៖ ត្រៀម Challenge Task (លំហាត់កម្រិតខ្ពស់) ឱ្យពួកគេធ្វើ ឬចាត់តាំងឱ្យជួយធ្វើជា Teaching Assistant ជួយមិត្តភក្តិ។\n• ចំពោះសិស្សរៀនយឺត៖ កុំបង្ខំឱ្យគេធ្វើចប់គ្រប់ចំណុច។ ឱ្យគេផ្ដោតតែលើ Core Exercise ឱ្យបានជោគជ័យជាមុនសិន ដើម្បីកុំឱ្យបាក់ទឹកចិត្ត។"),
        
        ("៤. របៀបបង្រៀនឱ្យសិស្សចេះគិតបែបដោះស្រាយបញ្ហា (Algorithmic & Critical Thinking)", 
         "កុំឱ្យសិស្សទន្ទេញចាំកូដ ឬទន្ទេញចាំប៊ូតុងចុច។ ត្រូវបង្រៀនឱ្យសិស្សយល់ពី Logic និងមូលហេតុ៖ «ហេតុអ្វីបានជាត្រូវចុចត្រង់នេះ?», «តើទិន្នន័យនេះហូរទៅណា?»។ នៅពេលគេយល់ពី Logic ទោះបីកម្មវិធី Update ប្ដូរ Interface ក៏គេនៅតែអាចចេះប្រើបានដែរ។")
    ]

    for title, desc in ped_tips:
        add_custom_heading(title, level=2, space_before=8)
        p = doc.add_paragraph()
        p.paragraph_format.line_spacing = 1.25
        p.paragraph_format.space_after = Pt(4)
        run = p.add_run(desc)
        format_run(run, font_khmer=FONT_KHMER, font_latin=FONT_LATIN, size_pt=10.5, color_rgb=RGBColor(51, 65, 85))

    # ------------------ SECTION 5: TEACHER'S DAILY LOG / NOTE TEMPLATE ------------------
    add_custom_heading("ផ្នែកទី ៥៖ ទម្រង់កត់ត្រាការបង្រៀនប្រចាំថ្ងៃ (Teacher's Daily Log Sheet)", level=1, space_before=16)

    p_log_intro = doc.add_paragraph()
    p_log_intro.paragraph_format.space_after = Pt(6)
    r_li = p_log_intro.add_run("លោកគ្រូ/អ្នកគ្រូ អាចកត់ត្រាព័ត៌មានសង្ខេបក្រោយចប់ការបង្រៀននាព្រឹកនេះ ដើម្បីងាយស្រួលតាមដាន និងរៀបចំសម្រាប់ថ្ងៃបន្ទាប់៖")
    format_run(r_li, font_khmer=FONT_KHMER, font_latin=FONT_LATIN, size_pt=10.5, italic=True, color_rgb=RGBColor(100, 116, 139))

    log_tbl = doc.add_table(rows=6, cols=2)
    log_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    log_tbl.autofit = False
    log_tbl.columns[0].width = Inches(2.2)
    log_tbl.columns[1].width = Inches(4.5)

    log_fields = [
        ("ប្រធានបទមេរៀនដែលបានបង្រៀន (Topic)", "...................................................................................................."),
        ("វត្តមានសិស្ស (Attendance)", "វត្តមាន៖ .......... នាក់ | អវត្តមាន៖ .......... នាក់ | សរុប៖ .......... នាក់"),
        ("បញ្ហាបច្ចេកទេសក្នុងបន្ទប់ Lab (Tech Issues)", "កុំព្យូទ័រលេខ៖ ................................... បញ្ហា៖ ........................................\nInternet/Wi-Fi៖ [ ] ល្អ  [ ] មធ្យម  [ ] មានការរអាក់រអួល"),
        ("សិស្សដែលត្រូវការការជួយបន្ថែម (Need Support)", "១. ..................................................... ២. ....................................................."),
        ("ចំណុចដែលសិស្សធ្វើបានល្អថ្ងៃនេះ (Successes)", "...................................................................................................."),
        ("កិច្ចការដែលត្រូវធ្វើបន្តនៅថ្ងៃស្អែក (Next Action)", "....................................................................................................")
    ]

    for row_idx, (label, default_val) in enumerate(log_fields):
        c0 = log_tbl.cell(row_idx, 0)
        set_cell_background(c0, "F1F5F9")
        set_cell_margins(c0, top=100, bottom=100, left=100, right=100)
        p0 = c0.paragraphs[0]
        p0.paragraph_format.space_before = Pt(0)
        p0.paragraph_format.space_after = Pt(0)
        r0 = p0.add_run(label)
        format_run(r0, font_khmer=FONT_KHMER, font_latin=FONT_LATIN, size_pt=10, bold=True, color_rgb=RGBColor(30, 58, 138))

        c1 = log_tbl.cell(row_idx, 1)
        set_cell_background(c1, "FFFFFF")
        set_cell_margins(c1, top=100, bottom=100, left=100, right=100)
        p1 = c1.paragraphs[0]
        p1.paragraph_format.space_before = Pt(0)
        p1.paragraph_format.space_after = Pt(0)
        r1 = p1.add_run(default_val)
        format_run(r1, font_khmer=FONT_KHMER, font_latin=FONT_LATIN, size_pt=10, color_rgb=RGBColor(71, 85, 105))

    set_table_borders(log_tbl, color="CBD5E1", sz="4", val="single")

    # Final inspirational note
    p_end = doc.add_paragraph()
    p_end.paragraph_format.space_before = Pt(16)
    p_end.paragraph_format.space_after = Pt(0)
    p_end.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_end = p_end.add_run("✨ ជូនពរលោកគ្រូ/អ្នកគ្រូ ទទួលបានការបង្រៀនមួយប្រកបដោយភាពរលូន និងទទួលបានផ្លែផ្កាខ្ពស់នាព្រឹកនេះ! ✨")
    format_run(r_end, font_khmer=FONT_KHMER, font_latin=FONT_LATIN, size_pt=11.5, bold=True, color_rgb=RGBColor(37, 99, 235))

    # Save documents
    target_filename_en = r"d:\MY Product\ICT_Morning_Teaching_Action_Plan.docx"
    target_filename_kh = r"d:\MY Product\ផែនការសកម្មភាពបង្រៀន_ICT_ពេលព្រឹក.docx"
    
    doc.save(target_filename_en)
    doc.save(target_filename_kh)
    print(f"Generated successfully with fonts [{FONT_LATIN} / {FONT_KHMER}]: {target_filename_en} and {target_filename_kh}")

if __name__ == "__main__":
    create_ict_morning_guide()
